class GetPlaylistByIdCommand{
    execute(args, unqfy){
        unqfy.getPlaylistById(parseInt(args[0]));
    }
}

module.exports = GetPlaylistByIdCommand;