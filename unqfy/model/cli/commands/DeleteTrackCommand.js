class DeleteTrackCommand{
    execute(args, unqfy){
        unqfy.deleteTrack(parseInt(args[0]));
        unqfy.save('data.json')
    }

}


module.exports = DeleteTrackCommand;