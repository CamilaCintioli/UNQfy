class AddTrackCommand{
  execute(args, unqfy){
    const [,albumId,,title,, duration,, ...genres] = args;
    unqfy.addTrack(parseInt(albumId),{
      title,
      duration: parseInt(duration),
      genres,
    });
  }

}
  
module.exports=AddTrackCommand;