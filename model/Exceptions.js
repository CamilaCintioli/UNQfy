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

class CommandDoesNotExist extends Error{
  constructor(){
    super('El comando no existe'); 
  }
}

module.exports = {DuplicatedArtist, DuplicatedTrackInAlbum, CommandDoesNotExist};