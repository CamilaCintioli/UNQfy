const rp = require('request-promise');
const spotifyCredentials = require('../../spotifyCreds.json');
const spotifyToken = spotifyCredentials.access_token; 

function searchIdForArtist(artistName) {
  const options = {
    url: 'https://api.spotify.com/v1/search',
    qs: {
      q: artistName,
      type: 'artist',
    },
    headers: { Authorization: `Bearer ${spotifyToken}` },
    json: true,
  };
  return rp.get(options)
    .then((response) => { return response.artists.items[0].id; })
    
}

function searchAlbumsForArtistId(artistId) {
  const options = {
    url: `https://api.spotify.com/v1/artists/${artistId}/albums`,
    headers: { Authorization: `Bearer ${spotifyToken}` },
    json: true,
  };
  return rp.get(options)
    .then((response) => {
      return response.items.map(album => {
        return { title: album.name, year: +album.release_date.slice(0, 4) };
      });
    });
}

module.exports={
  searchIdForArtist,searchAlbumsForArtistId
};