const { repeat } = require('lodash');

const rp = require('request-promise');

class NotifyService{

  update(artist,album){
    const options = {
      url: 'http://localhost:5000/api/notify',
      body: {
        artistId: artist.getId(),
        subject: `${artist.getName()} ha agregado un nuevo albúm`,
        message: `${album.getTitle()} es el nuevo albúm de tu artista! Escuchalo solo en UNQfy!`
      },
      json: true,
    };
    return rp.post(options);
  }

}

module.exports = NotifyService;