class RegisterTrackByUserCommand{
    execute(args, unqfy){
        //console.log("argumentos ", args );
        const [,userId,,trackId] = args;

        unqfy.registerTrackByUser(userId, trackId);
    }
}


module.exports = RegisterTrackByUserCommand;