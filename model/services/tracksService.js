function getLyrics(unqfy, trackId){
  let track = null;
  try{
    track = unqfy.getTrackById(trackId);
  }
  catch(error){
    return Promise.reject(error);
  }

  return unqfy.getLyrics(track.title)
    .then(lyrics => {return {lyrics, trackTitle: track.title};});

}


module.exports = {getLyrics};