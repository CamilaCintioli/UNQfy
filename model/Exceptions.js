class ErrorTheSameNameArtisit extends Error{
    constructor(){
        super("Ya existe un artista con ese nombre"); 
        //this.name = "ValidationError"; 
    }



}

module.exports=ErrorTheSameNameArtisit;