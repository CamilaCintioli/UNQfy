
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const ArtistRepository = require('./model/repositories/ArtistRepository');
const Artist = require('./model/Artist');
const Track = require('./model/Track');
const Album = require('./model/Album');
const TrackRepository = require('./model/repositories/TrackRepository');
const AlbumRepository = require('./model/repositories/AlbumRepository');
//const PlaylistRepository = require('./module/repositories/PlaylistRepository');

class UNQfy {
  constructor(){
    this.artistRepository = new ArtistRepository();
    this.trackRepository = new TrackRepository();
    this.albumRepository = new AlbumRepository();
    //this.playlistRepositiry = new PlaylistRepository();

  }
  
  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    this.artistRepository.addArtist(artistData);
  }

  updateArtist(artistId, artistData){
    this.artistRepository.editArtist(artistId, artistData);
  }

  deleteArtist(artistId){

    const artist = this.artistRepository.getArtistById(artistId);
    const albumsIds = artist.getAlbumsIds();
    const tracksIds = this.trackRepository.getTracksMatchingArtist(albumsIds).map(track => track.getId());
    
    tracksIds.forEach(trackId => this.trackRepository.deleteTrack(trackId));
    albumsIds.forEach(albumId => this.albumRepository.deleteAlbum(albumId));    
    this.artistRepository.deleteArtist(artistId);

  }


  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */

    const album = this.albumRepository.addAlbum(artistId,albumData);
    this.artistRepository.updateArtistAlbums(artistId,album.getId());
  }
  

  updateAlbum(albumId, albumData){
    this.albumRepository.editAlbum(albumId, albumData);

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
    this.trackRepository.addTrack(albumId, trackData);
  }

  updateTrack(trackId, trackData){
    this.trackRepository.editTrack(trackId, trackData);
  }

  getArtistById(id) {
    const artist = this.artistRepository.getArtistById(id);
    console.log(artist? artist : 'No existe un artista con ese id');
  }

  getAlbumById(id) {
    const album = this.albumRepository.getAlbumById(id);
    console.log(album? album: "No existe un album con id " + id);

  }

  getTrackById(id) {
    const track = this.trackRepository.getTrackById(id);
    console.log(track? track: "No existe un track con id " + id);
    
  }
/*
  getPlaylistById(id) {
    const playlist = this.playlistRepository.getPlaylistById(id);
    console.log(playlist? playlist: "No existe una playlist con id " + id);
  }*/

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    const track = this.trackRepository.getTracksMatchingGenres(genres);
    console.log(Array.isArray(track) && track.length ? track : "No existe un track con los generos pedidos");
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    
    const artists = this.artistRepository.getArtistsFromName(artistName);
    
    const albumsIds = artists.map((artist) => artist.getAlbumsIds()).flat();
       
    const track = this.trackRepository.getTracksMatchingArtist(albumsIds);
    console.log(Array.isArray(track) && track.length ? track : "No existe un track con el artista pedido");

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

  //this.PlaylistRepository.createPlaylist(playlistData);

  }

  save(filename) {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, ArtistRepository,Track, TrackRepository, Album, AlbumRepository];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

