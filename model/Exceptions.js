class DuplicatedArtist extends Error{
  constructor(){
    super('Ya existe un artista con ese nombre'); 
  }
}

class DuplicatedTrackInAlbum extends Error{
  constructor(){
    super('Ya existe ese track en el album'); 
  }

}

module.exports = {DuplicatedArtist, DuplicatedTrackInAlbum};