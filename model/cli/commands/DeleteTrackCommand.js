class DeleteTrackCommand{
    execute(args, unqfy){
        unqfy.deleteTrack(parseInt(args[0]));
    }

}


module.exports = DeleteTrackCommand;