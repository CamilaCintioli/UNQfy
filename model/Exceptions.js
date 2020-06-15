const {
  DUPLICATED_ARTIST_ERROR,
  DUPLICATED_ALBUM_ERROR,
  ARTIST_DOESNT_EXIST_ERROR,
  ALBUM_CANT_BE_CREATED_ERROR,
  ALBUM_DOESNT_EXIST_ERROR,
  TRACK_DOESNT_EXIST_ERROR
} = require('../exceptions');

class DuplicatedArtist extends Error{
  constructor(artist){
    super('Ya existe un artista con ese nombre'); 
    this.name = DUPLICATED_ARTIST_ERROR;
    this.data= artist;
  }
}

class DuplicatedTrackInAlbum extends Error{
  constructor(){
    super('Ya existe ese track en el album'); 
  }

}

class CommandDoesNotExist extends Error{
  constructor(){
    super('El comando no existe'); 
  }
}

class ArtistDoesNotExist extends Error {
  constructor(artistId){
    super('No existe un artista con ese id');
    this.name = ARTIST_DOESNT_EXIST_ERROR;
    this.message = 'No existe un artista con ese id';
    this.data = artistId;
  }
}

class AlbumCantBeCreated extends Error {
  constructor(artistId){
    super('No existe un artista con ese id');
    this.name = ALBUM_CANT_BE_CREATED_ERROR;
    this.message = 'No existe un artista con ese id';
    this.data = artistId;
  }
}

class DuplicatedAlbum extends Error{
  constructor(album){
    super('Ya existe un album con ese nombre'); 
    this.name = DUPLICATED_ALBUM_ERROR;
    this.data= album;
  }
}

class AlbumDoesNotExist extends Error {
  constructor(albumId){
    super('No existe un album con ese id');
    this.name = ALBUM_DOESNT_EXIST_ERROR;
    this.message = 'No existe un album con ese id';
    this.data = albumId;
  }
}

class TrackDoesNotExist extends Error {
  constructor(trackId){
    super('No existe un track con ese id');
    this.name = TRACK_DOESNT_EXIST_ERROR;
    this.message = 'No existe un track con ese id';
    this.data = trackId;
  }
}

module.exports = {
  DuplicatedArtist, 
  DuplicatedTrackInAlbum,
  CommandDoesNotExist, 
  ArtistDoesNotExist, 
  AlbumCantBeCreated, 
  DuplicatedAlbum,
  AlbumDoesNotExist,
  TrackDoesNotExist
};