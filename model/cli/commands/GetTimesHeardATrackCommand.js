class GetTimesHeardTrackACommand{
  execute (args, unqfy){
    console.log(unqfy.getTimesHeardATrack(parseInt(args[1]), parseInt(args[3])));
  }
}

module.exports = GetTimesHeardTrackACommand;