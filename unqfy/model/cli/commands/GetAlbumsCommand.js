class GetAlbumsCommand{
  execute(args, unqfy){
    console.log(unqfy.getAlbums());
  }
}

module.exports = GetAlbumsCommand;