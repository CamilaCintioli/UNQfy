class DeletePlaylistCommand{
    execute(args, unqfy){
        unqfy.deletePlaylist(parseInt(args[1]));

    }
}


module.exports = DeletePlaylistCommand;