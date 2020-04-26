class AddTrackCommand{
    execute(args, unqfy){
      unqfy.addTrack(undefined,{
        title: args[1],
        duration: args[3],
        genres:args[5]});
    }

  }
  
  module.exports=AddTrackCommand;