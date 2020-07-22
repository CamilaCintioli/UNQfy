const rp = require('request-promise');

class LoggerObserver{
  logAddArtist(artist){
    this.log('Se creo un nuevo artista '+ artist.name,'info');
  }

  logDeleteArtist(artist){
    this.log('Se borró el artista: ' + artist.name, 'info');
  }

  logAddAlbum(album){
    this.log('Se creo un nuevo album '+ album.title,'info');
  }

  logDeleteAlbum(album){
    this.log('Se borró el album: ' + album.title, 'info');
  }

  logAddTrack(track){
    this.log('Se creo un nuevo track '+ track.title,'info');
  }

  logDeleteTrack(track){
    this.log('Se borró el track: ' + track.title, 'info');
  }

  logError(error){
    this.log(error.name,'error')
  }

  log(message, level){
    const options = {
      url: 'http://loggy:7000/api/log',
      body: {
        level: level,
        message : message
      },
      json: true
    };
    rp.post(options);
  }

}

module.exports = LoggerObserver;