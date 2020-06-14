function createPlaylist(unqfy, playlistData){
    let playlist = undefined
    if (playlistData.tracks){
        playlist = addPlaylistWithIdsTracks(unqfy, playlistData.title, playlistData.tracks)   
    }
    else{
        playlist = unqfy.createPlaylist(playlistData.title, playlistData.genres, playlistData.duration);
    }
    unqfy.save('data.json');
    return playlist;
}

function addPlaylistWithIdsTracks(unqfy, title, idsTracks){
    const playlist = unqfy.createPlaylistWithIdsTracks(title, idsTracks);
    unqfy.save('data.json');
    return playlist;
}

function getPlaylists(unqfy){
    const playlists = unqfy.getPlaylists();
    return playlists;
}

function deletePlaylist(unqfy, playlistId) {
    unqfy.deletePlaylist(playlistId) ;
    unqfy.save('data.json');
}

function getPlaylistsByMaxDuration(unqfy, maxDuration){
    return unqfy.getPlaylistsByMaxDuration(maxDuration);;
}

function getPlaylistsByMinDuration(unqfy, minDuration){
    return unqfy.getPlaylistsByMinDuration(minDuration);
}

function searchPlaylists(unqfy, title, durationLT, durationGT){
    if(title){
        return unqfy.searchPlaylistsByTitle(title);
    }else{
        if(durationGT){
            return unqfy.getPlaylistsByMaxDuration(+durationGT);
        }
        else{
            return unqfy.getPlaylistsByMinDuration(+durationLT);
        }
    }
}

function getPlaylistById(unqfy, id){
    return unqfy.getPlaylistById(id);
}

function getPlaylistByTitle(unqfy, title){
    console.log("title: ", title);
    return unqfy.getPlaylistByTitle(title);
}



module.exports={createPlaylist, addPlaylistWithIdsTracks, getPlaylists, deletePlaylist, 
    getPlaylistsByMaxDuration, getPlaylistsByMinDuration, searchPlaylists, getPlaylistById,
    getPlaylistByTitle};