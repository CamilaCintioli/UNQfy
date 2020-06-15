class GetLyricsCommand{
  execute(args, unqfy){
    unqfy.getLyrics(args[0])
      .then((lyrics) => console.log(lyrics))
      .catch((error) => console.log('Algo salió mal. Intentelo nuevamente'));
  }
}

module.exports = GetLyricsCommand;