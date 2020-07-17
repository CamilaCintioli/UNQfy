class GetLyricsCommand{
  execute(args, unqfy){
    unqfy.getLyrics(args[0])
      .then((lyrics) => console.log(lyrics))
      .catch((error) => (error.name === 'TrackDoesNotExist') ?
        console.log('El track pedido no existe') : console.log('Algo salió mal. Intentelo nuevamente'));
  }
}

module.exports = GetLyricsCommand;