class AddAlbumCommand{
    execute(args, unqfy){
      unqfy.addAlbum(undefined,{
        title: args[1],
        tracks: args[3]});
    }
  }
  
  module.exports=AddAlbumCommand;
