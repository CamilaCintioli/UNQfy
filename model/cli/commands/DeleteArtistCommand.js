class DeleteArtistCommand{
  execute(args, unqfy){
    unqfy.deleteArtist(parseInt(args[0]));
  }
}

module.exports = DeleteArtistCommand;