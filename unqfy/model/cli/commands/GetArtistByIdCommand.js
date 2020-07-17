class GetArtistByIdCommand{
  execute(args, unqfy){
    const id = parseInt(args[0]);
    unqfy.getArtistById(id);
  }
}

module.exports = GetArtistByIdCommand;