class AddAlbumCommand{
  execute(args, unqfy){
    const [,artistId,,title,,year,...tracks] = args;
    unqfy.addAlbum(parseInt(artistId),{
      title,
      tracks,
      year:parseInt(year),
    });
  }
}
  
module.exports=AddAlbumCommand;
