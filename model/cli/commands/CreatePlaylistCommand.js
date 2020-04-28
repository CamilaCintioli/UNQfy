class CreatePlaylistCommand{
  execute(args, unqfy){
    const [,title,,duration,,...genres] = args;
    unqfy.createPlaylist(title, genres, parseInt(duration));
  }
}

module.exports=CreatePlaylistCommand;