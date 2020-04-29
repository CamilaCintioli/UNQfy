class AddArtistCommand{
  execute(args, unqfy){
    unqfy.addArtist({
      name: args[1],
      country:args[3]});
  }
}

module.exports=AddArtistCommand;