class GetPlaylistByIdCommand{
    execute(args, unqfy){
        unqfy.getPlaylistById(parseInt(args[1]));
    }
}

module.exports = GetPlaylistByIdCommand;