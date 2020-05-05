class GetTracksMatchingArtistCommand{
  execute(args,unqfy){
    console.log(unqfy.getTracksMatchingArtist(args[1]));
  }
}

module.exports=GetTracksMatchingArtistCommand;