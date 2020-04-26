class GetAlbumByIdCommand{
    execute(args, unquify){
        unquify.getAlbumById(parseInt(args[1]));
    }
}

module.exports = GetAlbumByIdCommand;