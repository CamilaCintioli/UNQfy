const rp = require('request-promise');

class LoggyService{
  logAdd(artist){
    this.log('Se creo un nuevo artista '+artist.name,'info');
  }

  logDelete(artist){
    this.log('Se borró el artista: ' + artist.name, 'info');
  }

  log(message, level){
    const options = {
      url: 'http://localhost:7000/api/log',
      body: {
        level: level,
        message : message
      },
      json: true
    };
    rp.post(options);
  }

}

module.exports = LoggyService;