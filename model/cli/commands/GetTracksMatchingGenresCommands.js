class GetTracksMatchingGenresCommands{
  execute(args, unquify){
    const [,...genres] = args;
    console.log(unquify.getTracksMatchingGenres(genres));
  }
} 

module.exports = GetTracksMatchingGenresCommands; 