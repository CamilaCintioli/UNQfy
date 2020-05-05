class GetAlbumByIdCommand{
  execute(args, unquify){
    console.log(unquify.getAlbumById(parseInt(args[1])));
  }
}

module.exports = GetAlbumByIdCommand;