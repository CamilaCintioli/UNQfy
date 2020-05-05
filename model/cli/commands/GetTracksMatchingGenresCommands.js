class GetTracksMatchingGenresCommands{
  execute(args, unquify){
    const [,...genres] = args;
    unquify.getTracksMatchingGenres(genres, true);
  }
} 

module.exports = GetTracksMatchingGenresCommands; 