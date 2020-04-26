class GetTrackByIdCommand{
    execute(args, unquify){
        unquify.getTrackById(parseInt(args[1]));
    }
}

module.exports = GetTrackByIdCommand; 
