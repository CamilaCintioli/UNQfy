class ListenTrackByUserCommand{
  execute(args, unqfy){
    const [,userId,,trackId] = args;

    unqfy.registerTrackByUser(parseInt(userId), parseInt(trackId));
  }
}


module.exports = ListenTrackByUserCommand;