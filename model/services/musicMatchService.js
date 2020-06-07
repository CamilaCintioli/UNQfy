const rp = require('request-promise');
//const spotifyCredentials = require('../../spotifyCreds.json');
const apikey = 'b5ec480ab7313b5a1c4e8aed1fc98520'; 


const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
let options = {
    uri: BASE_URL + '/artist.albums.get',
    qs: {
        apikey: 'b5ec480ab7313b5a1c4e8aed1fc98520',
        artist_id: 118,
        g_album_name: 1
    },
    json: true // Automatically parses the JSON string in the response
    };

function searchIdForTrack(title) {
  const options = {
    url: 'http://api.musixmatch.com/ws/1.1/track.search',
    qs: {
      q_track: title,
      apikey: apikey,
    },
    json: true,
  }
  return rp.get(options)
    .then((response) => { return console.log(response.message.body.track_list.
        find((track) => track.has_lyrics === 1))})
    .catch(error => console.error(error))
}

function searchLyricsForTrackId(trackId) {
  const options = {
    url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
    qs: {
        track_id: trackId,
        apikey: apikey,
      },
    json: true,
  };
  return rp.get(options)
    .then((response) => {
      return console.log(response)
    })
    .catch(error => console.error(error));
}

module.exports={
  searchIdForTrack, searchLyricsForTrackId
}

