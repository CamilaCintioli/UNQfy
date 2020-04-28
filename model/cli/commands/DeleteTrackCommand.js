class DeleteTrackCommand{
    execute(args, unqfy){
        unqfy.deleteTrack(parseInt(args[1]));
    }

}


module.exports = DeleteTrackCommand;