class GetTracksMatchingGenresCommands{
  execute(args, unquify){
    const [,...genres] = args;
    unquify.getTracksMatchingGenres(genres);
  }
} 

module.exports = GetTracksMatchingGenresCommands; 