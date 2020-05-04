class GetTracksListenByUserCommand{
    execute(args, unqfy){
        unqfy.getTracksListenByUser(parseInt(args[0]));
    }
}

module.exports = GetTracksListenByUserCommand;