class GetPlaylistsByMaxDurationCommand{
    execute(args,unqfy){
        console.log(unqfy.getPlaylistsByMaxDuration(args));
    }
}


module.exports = GetPlaylistsByMaxDurationCommand;