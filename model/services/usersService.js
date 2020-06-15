function addUser(unqfy, userData){
    const user = unqfy.addUser(userData);
    unqfy.save('data.json');
    return user;
}

function getUserById(unqfy, userId){
    return unqfy.getUserById(userId);
}

function listenTrackByUser(unqfy,userId,trackId){
    const listenUser = unqfy.listenTrackByUser(userId, trackId);
    unqfy.save('data.json');
    return listenUser;
}

function getTracksListenByUser(unqfy, userId){
    return unqfy.getTracksListenByUser(userId);
}

function getTimesHeardATrack(unqfy, userId, trackId){
    return unqfy.getTimesHeardATrack(userId, trackId);
}

function deleteUser(unqfy, userId){
    const users = unqfy.deleteUser(userId);
    unqfy.save('data.json');
}



module.exports={addUser, getUserById, listenTrackByUser, getTracksListenByUser, getTimesHeardATrack, deleteUser};