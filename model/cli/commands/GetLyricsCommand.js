class GetLyricsCommand{
    execute(args, unqfy){
        unqfy.getLyrics(args[0]);
    }
}

module.exports = GetLyricsCommand;