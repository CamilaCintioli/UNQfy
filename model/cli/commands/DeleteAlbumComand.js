class DeleteAlbumCommand{
    execute(args, unqfy){
        unqfy.deleteAlbum(parseInt(args[1]));

    }
}

module.export = DeleteAlbumCommand;