class AddAlbumCommand{
  execute(args, unqfy){
    const [,artistId,,title,,...tracks] = args;
    unqfy.addAlbum(parseInt(artistId),{
      title,
      tracks});
  }
}
  
module.exports=AddAlbumCommand;
