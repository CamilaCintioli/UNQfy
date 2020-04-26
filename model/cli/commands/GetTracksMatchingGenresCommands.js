class GetTracksMatchingGenresCommands{
    execute(args, unquify){
        unquify.getTracksMatchingGenres(args[5]);
    }
} 

module.exports = GetTracksMatchingGenresCommands; 