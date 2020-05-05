class GetTrackByIdCommand{
  execute(args, unquify){
    console.log(unquify.getTrackById(parseInt(args[1])));
  }
}

module.exports = GetTrackByIdCommand; 
