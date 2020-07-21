
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./model/Artist');
const Track = require('./model/Track');
const Album = require('./model/Album');
const Playlist = require('./model/Playlist');
const { DuplicatedArtist,
  DuplicatedTrackInAlbum,
  ArtistDoesNotExist,
  AlbumCantBeCreated,
  AlbumDoesNotExist,
  TrackDoesNotExist,
  PlaylistDoesNotExist,
  DuplicatedUser,
  UserDoesNotExist,
} = require('./model/Exceptions');
const User = require('./model/User');
const {searchIdForArtist,searchAlbumsForArtistId} = require('./model/services/spotifyService');
const {searchIdForTrack, searchLyricsForTrackId} = require('./model/services/musicMatchService');
const LoggyService = require('./model/services/LoggyService');
const NotifyService = require('./model/services/NotifyService');

class UNQfy {
  constructor() {
    this.artists = [];
    this.artistId = 0;
    this.albumId = 0;
    this.trackId = 0;
    this.playlists = [];
    this.playlistId = 0;
    this.userId = 0;
    this.users = [];
    this.loggyService = new LoggyService();
    this.notifyService = new NotifyService();

  }


  addArtist({ name, country }) {
    
    try {
      if (this.searchArtistsByName(name).length > 0) {
        throw new DuplicatedArtist(this.searchArtistsByName(name)[0]);
      }
      const newArtist = new Artist(this.artistId, name, country);
      this.loggyService.logAddArtist(newArtist);
      newArtist.addSuscribe(this.notifyService)
      this.artistId++;
      this.artists.push(newArtist);
      console.log('Se registró nuevo artista: ', newArtist);
      return newArtist;
    }
    catch (duplicatedArtist) {
      this.loggyService.logError(duplicatedArtist);
      console.log('Existe un artista con el nombre dado');
      throw duplicatedArtist;
    }
  }

  updateArtist(artistId, artistData) {

    const artist = this.artists.find(({ id }) => id === artistId);

    if (artist) {
      artist.edit(artistData);
      console.log('Artista modificado: ', artist);
      return artist;
    }
    console.log('Artista no existe con ese id: ', artistId);
    throw new ArtistDoesNotExist(artistId);
  }

  deleteArtist(artistId) {
    const artist = this.artists.find((artist) => artist.getId() === artistId);
    if (artist) {
      const tracks = this.getTracksMatchingArtist(artist.getName());
      this.playlists.forEach(playlist => playlist.deleteTracks(tracks));
      this.artists = this.artists.filter((artist) => artist.getId() !== artistId);
      this.loggyService.logDeleteArtist(artist);
      console.log('Artista borrado exitosamente');
    } else {
      console.log('No existe un artista con ese id ', artistId);
      const err = new ArtistDoesNotExist(artistId);
      this.loggyService.logError(err);
      throw err;
    }
  }

  getArtists() {
    console.log('Los artistas son: ', this.artists);
    return this.artists;
  }

  getArtistsByName(artistName){
    this.artists.filter(artist => artist.name);
  }

  getArtistById(id) {
    const artist = this.artists.find(artist => artist.getId() === id);
    if (artist) {
      console.log('El artista con id ', id, 'es: ', artist);
      return artist;
    }
    console.log('El artista no está registrado con el id ', id);
    throw new ArtistDoesNotExist(id);
  }

  searchArtistsByName(name) {
    return this.artists.filter(artist => artist.getName().toLowerCase().includes(name.toLowerCase()));
  }

  getArtistByName(artistName) {

    return this.artists.find(artist => artist.name === artistName);
  }




  addAlbum(artistId, { title, year }) {
    
    let artist = null;
    try{
      artist = this.getArtistById(artistId);
    }
    catch(error){
      const err =  new AlbumCantBeCreated(artistId);
      this.loggyService.logError(err);
      throw err;
    }
    const album = new Album(this.albumId, title, year);
    artist.addAlbum(album);
    console.log('Se registró un nuevo album ', album);
    this.loggyService.logAddAlbum(album);
    this.albumId++;
    return album;
  }


  updateAlbum(albumId, albumData) {
    const albums = this.artists.flatMap((artist) => artist.getAlbums());
    const album = albums.find((album) => album.getId() === albumId);
    if (album) {
      album.edit(albumData);
      console.log('the new album is: ', album);
      return album;
    }

    console.log('No existe album con ese id ', albumId);
    throw new AlbumDoesNotExist(albumId);
  }

  deleteAlbum(albumId) {
    const album = this.getAlbumById(albumId);
    if (!album) {
      console.log('No existe un album con el id');
      throw new AlbumDoesNotExist(albumId);
    }
    const tracks = album.getTracks();
    this.artists.forEach(artist => artist.deleteAlbum(albumId));
    this.playlists.forEach(playlist => playlist.deleteTracks(tracks));
    this.loggyService.logDeleteAlbum(album);
    console.log('Album fue borrado exitosamente');
  }

  getAlbums() {
    const albumes = this.artists.flatMap((artist) => artist.getAlbums());
    return albumes;
  }

  getAlbumById(id) {
    const albums = this.artists.map(artist => artist.getAlbums()).flat();
    const album = albums.find(album => album.getId() === id);
    if (album) {
      return album;
    }
    console.log('El album no esta registrado con el id ', id);
    const err =  new AlbumDoesNotExist(id);
    this.loggyService.logError(err);
    throw err;
  }

  searchAlbumsByTitle(name) {
    return this.getAlbums().filter(album => album.getTitle().toLowerCase().includes(name.toLowerCase()));
  }

  getAlbumsForArtist(artistName) {
    const artist = this.getArtistByName(artistName);
    if (artist) {
      return artist.getAlbums();
    }
    throw new Error('No existe un artista con ese nombre');
  }

  populateAlbumsForArtist(artistName) {

    const artistId = this.getArtistByName(artistName).id;

    return searchIdForArtist(artistName)
      .then((id) => searchAlbumsForArtistId(id))
      .then((albums) => albums.forEach(album => this.addAlbum(artistId, album)))
      .catch((error) => console.log('Algo salió mal.'));

  }



  createPlaylist(name, genresToInclude, maxDuration) {
    
    const tracks = this.getTracksMatchingGenres(genresToInclude);
    let duration = 0;
    const playlistTracks = [];

    tracks.forEach((track) => {
      if (track.getDuration() + duration <= maxDuration) {
        playlistTracks.push(track);
        duration += track.getDuration();
      }
    });

    const newPlaylist = new Playlist(this.playlistId, name, playlistTracks, duration);
    this.playlists.push(newPlaylist);
    this.playlistId++;
    console.log('Se registró una nueva playlist ', newPlaylist);
    return newPlaylist;
  }

  createPlaylistWithIdsTracks(name, idsOfTracks){
    const tracks = this.getTracksMatchingIdsTracks(idsOfTracks);
    let duration = 0;
   
    tracks.forEach((track) => {
      duration += track.getDuration();
    });

    const newPlaylist = new Playlist(this.playlistId, name, tracks, duration);
    this.playlists.push(newPlaylist);
    this.playlistId++;
    console.log('Se registró una nueva playlist ', newPlaylist);
    return newPlaylist;
  }

  getPlaylists() {
    console.log('Las playlist son: ', this.playlists);
    return this.playlists;
  }

  deletePlaylist(playlistId) {
    this.getPlaylistById(playlistId);
    this.playlists = this.playlists.filter(playlist => playlist.getId() !== playlistId);
  }

  getPlaylistById(id) {
    const playlist = this.playlists.find(playlist => playlist.getId() === id);
    if (playlist) {
      console.log('La playlist con id ', id, 'es ', playlist);
      return playlist;
    }
    console.log('La playlist no pertenece a unqfy');
    throw new PlaylistDoesNotExist(id);
  }

  getPlaylistsByMaxDuration(maxDuration){
    const playlists = this.getPlaylists();
    const playListMaxDuration = playlists.filter(playlist => playlist.getDuration() > maxDuration);
    return playListMaxDuration;
  }

  getPlaylistsByMinDuration(minDuration){
    const playlists = this.getPlaylists();
    const playListMinDuration = playlists.filter(playlist => playlist.getDuration() < minDuration);
    return playListMinDuration;
  }

  getPlaylistByTitle(title){
    const playlists = this.getPlaylists();
    const playlist = playlists.filter((playlist) => playlist.getTitle() === title);
    return playlist;
  }

  searchPlaylistsByTitle(name) {
    return this.playlists.filter(playlist => playlist.getTitle().toLowerCase().includes(name.toLowerCase()));
  }


 
  addTrack(albumId, trackData) {
    
    const album = this.getAlbumById(albumId);

    try {
      if (!album) {
        return undefined;
      }
      if (album.hasTrackWithTitle(trackData.title)) {
        const err = new DuplicatedTrackInAlbum();
        this.loggyService.logError(err);
        throw err;
      }
      const track = new Track(this.trackId, trackData.title, trackData.genres, trackData.duration);
      album.addTrack(track);
      this.trackId++;
      this.loggyService.logAddTrack(track);
      console.log('Se registró un nuevo track', track);
      return track;
    } catch (DuplicatedTrackInAlbum) {
      this.loggyService.logError(DuplicatedTrackInAlbum);
      console.log('Ya existe un track con ese nombre en el album');
    }

  }
  
  updateTrack(trackId, trackData) {
    const tracks = this.getAlbums().flatMap(album => album.getTracks());
    const track = tracks.find(track => track.getId() === trackId);
    if (track) {
      track.edit(trackData);
      console.log('the new track is: ', track);
      return track;
    }
    console.log('no existe el track con es id ', trackId);
  }

  deleteTrack(trackId) {
    const albumes = this.getAlbums();
    const track = this.getTrackById(trackId);
    if (track) {
      albumes.forEach(album => album.deleteTrack(trackId));
      this.playlists.forEach(playlist => playlist.deleteTrack(trackId));
      this.loggyService.logDeleteTrack(track);
      console.log('Track borrado exitosamente');
    } else {
      console.log('No existe un track con ese id ', trackId);
    }
  }

  getTracks() {
    const tracks = this.getAlbums().map(album => album.getTracks()).flat();
    return tracks;
  }

  getTrackById(id) {
    const track = this.getTracks().find(track => track.getId() === id);
    if (track) {
      return track;
    }
    console.log('El track no pertenece a ningún album');
    throw new TrackDoesNotExist(id);
  }

  getTracksMatchingGenres(genres) {
    const tracks = this.getTracks();
    const tracksByGenre = tracks.filter(track => track.haveAnyGenres(genres));
    return tracksByGenre;
  }

  getTracksMatchingArtist(artistName) {

    const artist = this.artists.find(artist => artist.getName() === artistName);
    if (artist) {
      const tracks = artist.getAlbums().flatMap(album => album.getTracks());
      return tracks;
    }
    console.log('No existe un artista con ese nombre');

  }

  getTracksMatchingIdsTracks(ids){
    const listResult = [];
    ids.forEach(id => listResult.push(this.getTrackById(id)));
    return listResult;
  }

  searchTracksByTitle(name) {
    return this.getTracks().filter(track => track.getTitle().toLowerCase().includes(name.toLowerCase()));
  }

  getLyrics(title){

    try {
      const track = this.getTracks().find((track) => track.title === title);
      if(!track){
        throw new TrackDoesNotExist(title);
      }
      return searchIdForTrack(title)
        .then((id) => {return track.getLyrics(id);});
    }
    catch(error){
      return Promise.reject(error);
    }
  }

  

  addUser({name,lastname}) {
    const user = this.users.find(user => user.getName() === name && user.getLastname() === lastname);
    if (!user) {
      const user = new User(this.userId, name,lastname);
      this.users.push(user);
      console.log('Se registró un nuevo user ', user);
      this.userId++;
      return user;
    }
    console.log('Ya existente el usuario ', name, lastname);
    throw new DuplicatedUser(user);
  }

  listenTrackByUser(userId, trackId) {
    const track = this.getTrackById(trackId);
    const user = this.getUserById(userId);
    user.addTrackHeard(track);
    return user;
  }

  getUserById(id) {
    const user = this.users.find(user => user.id === id);
    if(!user){
      throw new UserDoesNotExist(id);
    }
    return user;
  }

  getTracksListenByUser(userId) {
    const user = this.getUserById(userId);
    const tracksListen = user.getTracks();
    console.log('tracks escuchados ', tracksListen);
    return user.getTracks();
  }

  getTimesHeardATrack(userId, trackId) {
    const user = this.getUserById(userId);
    const times = user.timesHeardATrack(trackId);
    return times;
  }

  getTopTracksOfArtist(artistId) {
    const artist = this.artists.find(artist => artist.getId() === artistId);
    const tracks = this.getTracksMatchingArtist(artist.getName());

    const topTracks = {};

    tracks.forEach(track => topTracks[track.title] = this.timesHeardTotal(track));

    const topTrack = Object.keys(topTracks)
      .sort((track1, track2) => topTracks[track1] < topTracks[track2])
      .splice(0, 3);

    console.log('Las tracks mas escuchadas del artista son', topTrack);
    return topTrack;


  }

  timesHeardTotal(track) {
    return this.users.reduce((timesHeard, user) => this.getTimesHeardATrack(user.getId(), track.getId()) + timesHeard, 0);
  }

  deleteUser(userId){

    const user = this.getUserById(userId);
    if (!user) {
      console.log('No existe un usuario con el id');
      return "nada";
    }
    this.users = this.users.filter(user => user.getId() !== userId);
    console.log('El user ha sido eliminado exitosamente');
    return this.users;
  }

  

  

  save(filename) {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
    const classes = [UNQfy, Artist, Track, Album, Playlist, User, NotifyService, LoggyService];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }

  searchByName(name) {
    return {
      artists: this.searchArtistsByName(name),
      albums: this.searchAlbumsByTitle(name),
      tracks: this.searchTracksByTitle(name),
      playlists: this.searchPlaylistsByTitle(name),
    };
  }
  

  
}





module.exports = {UNQfy};

