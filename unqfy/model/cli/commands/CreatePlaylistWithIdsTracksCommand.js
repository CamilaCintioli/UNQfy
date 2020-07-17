class CreatePlaylistWithIdsTracksCommand{
    execute(args, unqfy){
        const [title,...ids] = args;
        unqfy.createPlaylist(title, ids);
        unqfy.save('data.json');
      }
}

module.exports = CreatePlaylistWithIdsTracksCommand;