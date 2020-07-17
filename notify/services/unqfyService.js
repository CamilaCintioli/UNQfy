const rp = require('request-promise');

function verifyArtist(artistId) {
  const options = {
    url: `http://unqfy:3000/api/artists/${artistId}`,
    json: true,
  };
  return rp.get(options);
}

module.exports = {verifyArtist};