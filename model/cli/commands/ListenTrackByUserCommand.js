class ListenTrackByUserCommand{
  execute(args, unqfy){
    const [userId,trackId] = args;

    unqfy.listenTrackByUser(parseInt(userId), parseInt(trackId));
  }
}


module.exports = ListenTrackByUserCommand;