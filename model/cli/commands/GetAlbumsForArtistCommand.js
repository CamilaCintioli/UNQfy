class GetAlbumsForArtistCommand {
  execute(args, unqfy) {
    console.log(unqfy.getAlbumsForArtist(args[0]));
  }
}
  
module.exports = GetAlbumsForArtistCommand;