class DeletePlaylistCommand{
  execute(args, unqfy){
    unqfy.deletePlaylist(parseInt(args[0]));

  }
}


module.exports = DeletePlaylistCommand;