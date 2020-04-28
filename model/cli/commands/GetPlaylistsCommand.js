class GetPlaylistsCommand{
    execute(args, unqfy){
        unqfy.getPlaylists();
    }
}

module.exports=GetPlaylistsCommand;