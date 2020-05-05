class GetTracksCommand{
  execute(args,unqfy){
    unqfy.getTracks(true);
  }
}

module.exports = GetTracksCommand;