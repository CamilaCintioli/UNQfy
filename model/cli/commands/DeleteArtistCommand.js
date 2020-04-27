class DeleteArtistCommand{
  execute(args, unqfy){
    unqfy.deleteArtist(parseInt(args[1]));
  }
}

module.exports = DeleteArtistCommand;