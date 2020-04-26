class AddTrackCommand{
  execute(args, unqfy){
    const [,title,, duration,, ...genres] = args;
    unqfy.addTrack(undefined,{
      title,
      duration,
      genres});
  }

}
  
module.exports=AddTrackCommand;