function getLyrics(unqfy, trackId){
    const trackTitle =  unqfy.getTrackById(trackId).title;
    return unqfy.getLyrics(trackTitle)
    .then(lyrics => {return {lyrics, trackTitle }});
}


module.exports = {getLyrics};