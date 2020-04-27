class GetTracksMatchingArtistCommand{
  execute(args,unqfy){
    unqfy.getTracksMatchingArtist(args[1]);
  }
}

module.exports=GetTracksMatchingArtistCommand;