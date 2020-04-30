class ErrorTheSameNameArtisit extends Error{
    constructor(){
        super("Ya existe un artista con ese nombre"); 
    }
}

class ErrorTheSameTrackInAlbum extends Error{
    constructor(){
        super("Ya existe ese track en el album"); 
    }

}

module.exports = {ErrorTheSameNameArtisit, ErrorTheSameTrackInAlbum};