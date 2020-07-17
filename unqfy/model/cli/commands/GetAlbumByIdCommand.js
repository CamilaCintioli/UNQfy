class GetAlbumByIdCommand{
  execute(args, unquify){
    console.log(unquify.getAlbumById(parseInt(args[0])));
  }
}

module.exports = GetAlbumByIdCommand;