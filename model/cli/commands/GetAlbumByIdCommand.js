class GetAlbumByIdCommand{
    execute(args, unquify){
        unquify.getAlbumById(parseInt(args[1]),true);
    }
}

module.exports = GetAlbumByIdCommand;