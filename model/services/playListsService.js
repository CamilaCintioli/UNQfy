function addPlaylist(unqfy, name, genresToInclude, maxDuration){
    const playList = unqfy.createPlaylist(name, genresToInclude, maxDuration);
    unqfy.save('data.json');
    return playList;
}

function addPlaylistWithIdsTracks(unqfy, name, idsTracks){
    const playList = unqfy.createPlaylistWithIdsTracks(name, idsTracks);
    unqfy.save('data.json');
    return playList;
}

function getPlaylists(unqfy){
    const playLists = unqfy.getPlaylists();
    return playLists;
}

function deletePlaylist(unqfy, playlistId) {
    unqfy.deletePlaylist(playlistId) ;
    unqfy.save('data.json');
}

function getPlaylistsByMaxAndMinDuration(unqfy, maxDuration, minDuration){
    const playlists = unqfy.getPlaylistsByMaxAndMinDuration(maxDuration, minDuration);
    return playLists;
}



module.exports={addPlaylist, addPlaylistWithIdsTracks, getPlaylists, deletePlaylist, getPlaylistsByMaxAndMinDuration};