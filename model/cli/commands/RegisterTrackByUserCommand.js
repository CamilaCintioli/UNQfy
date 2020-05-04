class RegisterTrackByUserCommand{
    execute(args, unqfy){
        //console.log("argumentos ", args );
        const [,userId,,trackId] = args;

        unqfy.registerTrackByUser(parseInt(userId), parseInt(trackId));
    }
}


module.exports = RegisterTrackByUserCommand;