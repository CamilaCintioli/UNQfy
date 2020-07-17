class CreatePlaylistCommand{
  execute(args, unqfy){
    const [title,duration,...genres] = args;
    unqfy.createPlaylist(title, genres, parseInt(duration));
    unqfy.save('data.json');
  }
}

module.exports=CreatePlaylistCommand;