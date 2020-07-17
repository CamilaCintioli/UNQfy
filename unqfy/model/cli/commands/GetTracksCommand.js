class GetTracksCommand{
  execute(args,unqfy){
    console.log(unqfy.getTracks());
  }
}

module.exports = GetTracksCommand;