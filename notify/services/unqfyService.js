const rp = require('request-promise');

function verifyArtist(artistId) {
  const options = {
    url: `http://localhost:3000/api/artists/${artistId}`,
    json: true,
  };
  return rp.get(options);
}

module.exports = {verifyArtist}