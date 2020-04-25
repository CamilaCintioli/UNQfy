class AddArtistCommand{
  execute(args, unqfy){
    unqfy.addArtist({
      name: args[1],
      lastname: args[3],
      country:args[5]});
  }
}

module.exports=AddArtistCommand;