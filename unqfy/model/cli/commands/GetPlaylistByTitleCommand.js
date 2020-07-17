class GetPlaylistByTitleCommand{
    execute(args, unqfy) {
        console.log(unqfy.getPlaylistByTitle(args[0]));
      }
}

module.exports = GetPlaylistByTitleCommand;