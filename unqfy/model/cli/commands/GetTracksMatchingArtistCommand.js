class GetTracksMatchingArtistCommand{
  execute(args,unqfy){
    console.log(unqfy.getTracksMatchingArtist(args[0]));
  }
}

module.exports=GetTracksMatchingArtistCommand;