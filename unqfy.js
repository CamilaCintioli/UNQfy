
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./model/Artist');
const Track = require('./model/Track');
const Album = require('./model/Album');
const Playlist = require('./model/Playlist');
const {ErrorTheSameNameArtist, ErrorTheSameTrackInAlbum} = require('./model/Exceptions');
const User = require ('./model/User');

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
  }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist({ name, country }) {
    /* Crea un artista y lo agrega a unqfy.
    El objeto artista creado debe soportar (al menos):
      - una propiedad name (string)
      - una propiedad country (string)
    */
    if (this.searchArtistsByName(name).length > 0){
      throw new ErrorTheSameNameArtist();
    }
    const newArtist = new Artist(this.artistId, name, country);
    this.artistId++;
    this.artists.push(newArtist);
    console.log('Se registró nuevo artista: ', newArtist);
    return newArtist;
  }

  updateArtist(artistId, artistData) {

    const artist = this.artists.find(({ id }) => id === artistId);

    if (artist) {
      artist.edit(artistData);
      console.log('Artista modificado: ', artist);
      return artist;
    }
    console.log('Artista no existe con ese id: ', artistId);
  }

 
  deleteArtist(artistId) {
    const artist = this.artists.find((artist) => artist.getId() === artistId);
    if (artist) {
      this.artists = this.artists.filter((artist) => artist.getId() !== artistId);
      console.log('Artista borrado exitosamente');
    } else {
      console.log('No existe un artista con ese id ', artistId);
    }
  }

  getArtists() {
    console.log('Los artistas son: ', this.artists);
    return this.artists;
  }

  getPlaylists() {
    console.log("Las playlist son: ", this.playlists);
    return this.playlists;
  }

  getAlbums() {
    const albumes = this.artists.flatMap((artist) => artist.getAlbums());
    console.log('Los albumes registrados son: ', albumes);
    return albumes;
  }


  deletePlaylist(playlistId) {
    this.playlists = this.playlists.filter(playlist => playlist.getId() !== playlistId);
    console.log('La playlist ha sido eliminada exitosamente');
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, { title, year }) {
    /* Crea un album y lo agrega al artista con id artistId.
      El objeto album creado debe tener (al menos):
       - una propiedad name (string)
       - una propiedad year (number)
    */
    const artist = this.artists.find(({ id }) => id === artistId);
    if (artist) {
      const album = new Album(this.albumId, title, year);
      artist.addAlbum(album);
      console.log('Se registró un nuevo album ', album);
      this.albumId++;
      return album;
    }
    console.log('No existe un artista con ese id ', artistId);
  }


  updateAlbum(albumId, albumData) {
    const albums = this.artists.flatMap((artist) => artist.getAlbums());
    const album = albums.find((album) => album.getId() === albumId);
    if(album){
      album.edit(albumData);
      console.log('the new album is: ', album);
      return album;
    }

    console.log('No existe album con ese id ', albumId);
  }


  deleteAlbum(albumId) {
    const artist = this.artists.find((artist) => artist.getAlbums().map((album) => album.getId()).includes(albumId));

    if(artist){
      artist.deleteAlbum(albumId);
      console.log('Album borrado exitosamente');
    } else {
      console.log('No existe un album con ese id ', albumId);
    }
  }

  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)
    */
    const checkTrack = this.getAlbums().flatMap(album => album.getTracks()).
                                      find(track => track.getTitle() === trackData.title);
    if (checkTrack){
      throw new ErrorTheSameTrackInAlbum();
    } 
    const albums = this.getAlbums();
    const album = albums.find(album => album.getId() === albumId);
    if (album) {
      const track = new Track(this.trackId, trackData.title, trackData.genres, trackData.duration);
      album.addTrack(track);
      console.log('Se registró un nuevo track', track);
      this.trackId++;
      return track;
    }
    console.log('No existe un album con ese id', albumId);
  }

  updateTrack(trackId, trackData) {
    const tracks = this.getAlbums().flatMap(album => album.getTracks());
    const track = tracks.find(track => track.getId() === trackId);
    if (track) {
      Object.keys(trackData).forEach(key => this.editTrack(key, track, trackData[key]));
      console.log('the new track is: ', track);
      return track;
    }
    console.log('no existe el track con es id ', trackId);
  }

  editTrack(key, track, data) {
    switch (key) {
    case 'title':
      track.setTitle(data);
      break;
    case 'duration':
      track.setDuration(data);
      break;
    case 'genres':
      track.setGenres(data);
      break;
    case 'albumId':
      track.setAlbumId(data);
      break;
    }
  }

  deleteTrack(trackId) {
    const album = this.artists.flatMap(artist => artist.getAlbums()).find(album => album.getTracks().map(track => track.getId()).includes(trackId));
    if(album){
      album.deleteTrack(trackId);
      this.playlists.forEach(playlist => playlist.deleteTrack(trackId));
      console.log('Track borrado exitosamente');
    } else {
      console.log('No existe un track con ese id ', trackId);
    }
  }

  getArtistById(id) {
    const artist = this.artists.find(artist => artist.getId() === id);
    if (artist) {
      return (console.log('El artista con id ', id, 'es: ', artist));
    }  
    console.log ('El artista no está registrado con el id ', id);
  }

  getAlbumById(id) {
    const albums = this.artists.map(artist => artist.getAlbums()).flat();
    const album = albums.find(album => album.getId() === id);
    if (album){
      return (console.log('El album con id ', id, 'es: ', album));
    }
    console.log ('El album no esta registrado con el id ', id);
  }

  getAllTracks(){
    const tracks = this.getAlbums().map(album => album.getTracks()).flat();
    return tracks;
  }

  getTrackById(id) {
    const track = this.getAllTracks().find(track => track.getId() === id);
    if (track){
      console.log('El track con id ', id, 'es: ', track)
      return track;
    }
    console.log('El track no pertenece a ningún album');
  }


  getPlaylistById(id) {
    const playlist = this.playlists.find(playlist => playlist.getId() === id);
    if (playlist){
      return (console.log('La playlist con id ', id, 'es ', playlist));
    }
    console.log('La playlist no pertenece a unqfy');
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {

    const tracks = this.artists.flatMap((artist) => artist.getAlbums()).flatMap(album => album.getTracks());

    const tracksByGenre = tracks.filter(track => track.haveAnyGenres(genres));
    console.log(tracksByGenre);
    return tracksByGenre;

  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    
    const artist = this.artists.find(artist => artist.getName() === artistName);
    if(artist){
      const tracks = artist.getAlbums().flatMap(album => album.getTracks());
      
      console.log(tracks);
      return tracks;
    } 
    console.log('No existe un artista con ese nombre');
    
  }


  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
    /*** Crea una playlist y la agrega a unqfy. ***
      El objeto playlist creado debe soportar (al menos):
        * una propiedad name (string)
        * un metodo duration() que retorne la duración de la playlist.
        * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
    */

    const tracks = this.getTracksMatchingGenres(genresToInclude);
    let duration = 0;
    const playlistTracks = [];
    
    tracks.forEach((track) => {
      if(track.getDuration()+duration <= maxDuration){
        playlistTracks.push(track);
        duration+=track.getDuration();
      }  
    });
    console.log(playlistTracks[0]);
    const newPlaylist = new Playlist(this.playlistId, name, playlistTracks, duration);
    this.playlists.push(newPlaylist);
    this.playlistId++;
    console.log('Se registró una nueva playlist ', newPlaylist);
    return newPlaylist;
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
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Track, Album, Playlist,User];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }

  searchByName(name){
    return {
      artists: this.searchArtistsByName(name),
      albums: this.searchAlbumsByTitle(name),
      tracks: this.searchTracksByTitle(name),
      playlists: this.searchPlaylistsByTitle(name),
    };
  }

  searchArtistsByName(name) {
    return this.artists.filter(artist => artist.getName().toLowerCase().includes(name.toLowerCase()));
  }

  searchAlbumsByTitle(name) {
    return this.getAlbums().filter(album => album.getTitle().toLowerCase().includes(name.toLowerCase()));
  }

  searchTracksByTitle(name) {
    return this.getAllTracks().filter(track => track.getTitle().toLowerCase().includes(name.toLowerCase()));
  }

  searchPlaylistsByTitle(name) {
    return this.playlists.filter(playlist => playlist.getTitle().toLowerCase().includes(name.toLowerCase()));
  }



  addUser(userData){
    const user = this.users.map(user => user.name).includes(userData.name);
    if (!user) {
      const user = new User(this.userId, userData.name, userData.lastname);
      this.users.push(user);
      console.log('Se registró un nuevo user ', user);
      this.userId++;
      return user;
    }
    console.log('Ya existente el usuario ', user.getName());
  }

  registerTrackByUser(userId, trackId){
    const track = this.getTrackById(trackId);
    const user = this.getUserById(userId);
    const tracks = user.addTrackHeard(track);
  } 

  getUserById(id){
    return this.users.find(user => user.id === id);
  }

  getTracksListenByUser(userId){
    const user = this.getUserById(userId);
    const tracksListen = user.getTracks();
    console.log("tracks escuchados ", tracksListen);
    return user.getTracks();
  }

  getTimesHeardATrack(userId, trackId){
    const user = this.getUserById(userId);

    console.log("Escucho el track ", user.timesHeardATrack(trackId), "veces");
  }



  
  

  
}




// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

