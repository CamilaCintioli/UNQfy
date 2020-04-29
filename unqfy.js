
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./model/Artist');
const Track = require('./model/Track');
const Album = require('./model/Album');
const Playlist = require('./model/Playlist');

class UNQfy {
  constructor(){
    this.artists = [];
    this.artistId = 0;
    this.albumId = 0;
    this.trackId = 0;
  }
  
  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist({name, lastname, country}) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    const newArtist = new Artist(this.artistId, name, lastname, country);
    this.artistId++;
    this.artists.push(newArtist);
    console.log('Se registró nuevo artista: ', newArtist);
    return newArtist;
    
  }

  updateArtist(artistId, artistData){
    
    const artist = this.artists.find(({id}) => id === artistId);

    if(artist){
      Object.keys(artistData).forEach(key => this.editArtist(key, artist, artistData[key]));
      console.log('Artista modificado: ', artist);
      return artist;
    } 
    console.log('Artista no existe con ese id: ', artistId);
  }

  editArtist(key, artist, data){
    switch (key){
    case 'name':
      artist.setName(data);
      break;
    case 'lastname':
      artist.setLastname(data);
      break;
    case 'country':
      artist.setCountry(data);     
      break; 
    }
  }


  deleteArtist(artistId){
    const artist = this.artists.find((artist) => artist.getId() === artistId);
    if(artist){
      this.artists = this.artists.filter((artist) => artist.getId() !== artistId);
      console.log('Artista borrado exitosamente');
    } else {
      console.log('No existe un artista con ese id ', artistId);
    }      
  }

  getArtists(){
    console.log("Los artistas son: ", this.artists);
    return this.artists
  }
  
  getPlaylists(){
    
  }

  getAlbums(){
    const albumes = this.artists.flatMap((artist) => artist.getAlbums());
    console.log("Los albumes son: ", albumes);
    return albumes;
  }

  
  deletePlaylist(playlistId){
    
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, {title, year}) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    const artist = this.artists.find(({id}) => id === artistId);
    if(artist){
      const album = new Album(this.albumId, title, year);
     artist.addAlbum(album);
      console.log('Se registró un nuevo album ', album);
      return album;
    } 
    console.log('No existe un artista con ese id ', artistId);
  }
  

  updateAlbum(albumId, albumData){
    
  }

  deleteAlbum(albumId){
    
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
    const track = new Track(this.trackId, trackData.title, trackData.genres, trackData.duration);
    const albumes = this.getAlbums();
    const album = albumes.find(album => album.getId() === albumId);
    album.addTrack(track);  
    return track;
  }

  updateTrack(trackId, trackData){
    const tracks = this.getAlbums().flatMap(album => album.getTracks());
    const track = tracks.find(track => track.getId() === trackId);
    if (track){
      Object.keys(trackData).forEach(key => this.editTrack(key, track, trackData[key]));
      console.log('the new track is: ', track);
      return track;
    } 
    console.log("no existe el track con es id ", trackId);
  }

  editTrack(key,track, data){
    switch (key){
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

  deleteTrack(trackId){
    
  }

  getArtistById(id) {
    
    
  }

  getAlbumById(id) {
    
    
  }

  getTrackById(id) {
    
    
  }

  getPlaylistById(id) {
    
    
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    
    
    
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    
    
    
    
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
    const classes = [UNQfy, Artist,Track, Album, Playlist];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

