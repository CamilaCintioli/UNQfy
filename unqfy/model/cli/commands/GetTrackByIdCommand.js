class GetTrackByIdCommand{
  execute(args, unquify){
    console.log(unquify.getTrackById(parseInt(args[0])));
  }
}

module.exports = GetTrackByIdCommand; 
