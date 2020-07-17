const { repeat } = require('lodash');

const rp = require('request-promise');

class NotifyService{

  update(artist,album){
    const options = {
      url: 'http://notify:5000/api/notify',
      body: {
        artistId: artist.getId(),
        subject: this._createSubject(artist),
        message: this._createMessage(artist,album)
      },
      json: true,
    };
    return rp.post(options);
  }

  _createSubject(artist){
    return `${artist.getName()} ha agregado un nuevo albúm`;
  }

  _createMessage(artist,album){
    return `${album.getTitle()} es el nuevo albúm de tu artista favorito: ${artist.getName()}! Escuchalo solo en UNQfy!`;
  }

}

module.exports = NotifyService;