class GetTopTracksOfArtistCommand{
  execute(args,unqfy){
    unqfy.getTopTracksOfArtist(parseInt(args[0]));
  }
}

module.exports = GetTopTracksOfArtistCommand;