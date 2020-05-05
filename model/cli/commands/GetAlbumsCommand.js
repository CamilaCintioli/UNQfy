class GetAlbumsCommand{
  execute(args, unqfy){
    unqfy.getAlbums(true);
  }
}

module.exports = GetAlbumsCommand;