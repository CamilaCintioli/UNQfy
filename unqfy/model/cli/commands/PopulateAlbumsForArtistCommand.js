class PopulateAlbumsForArtistCommand {
  execute(args, unqfy) {
    unqfy.populateAlbumsForArtist(args[0])
      .then(() => unqfy.save('data.json'))
      .catch((error) => console.error(error));
    

   
  }
}

module.exports = PopulateAlbumsForArtistCommand;