class DeleteAlbumCommand{
  execute(args, unqfy){
    unqfy.deleteAlbum(parseInt(args[0]));

  }
}

module.exports = DeleteAlbumCommand;