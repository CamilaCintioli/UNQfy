class GetPlaylistsByMinDurationCommand{
    execute(args,unqfy){
        console.log(unqfy.getPlaylistsByMinDuration(args));
    }
}


module.exports = GetPlaylistsByMinDurationCommand;