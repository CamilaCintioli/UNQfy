class GetTracksMatchingArtistCommand{
  execute(args,unqfy){
    unqfy.getTracksMatchingArtist(args[1],true);
  }
}

module.exports=GetTracksMatchingArtistCommand;