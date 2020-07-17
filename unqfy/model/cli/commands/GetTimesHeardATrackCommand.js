class GetTimesHeardTrackACommand{
  execute (args, unqfy){
    console.log(unqfy.getTimesHeardATrack(parseInt(args[0]), parseInt(args[1])));
  }
}

module.exports = GetTimesHeardTrackACommand;