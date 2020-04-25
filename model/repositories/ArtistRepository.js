const Artist = require('../Artist');

class ArtistRepository{
  constructor(){
    this.artistId=0;
    this.artists = [];
  }

  addArtist({name,lastname,country}){
    const newArtist = new Artist(this.artistId, name, lastname, country);
    this.artists.push(newArtist);
    this.increaseId();
  }

  increaseId(){
    this.artistId++;
  }

  getArtistById(artistId){
    return this.artists.find(({id}) => id === artistId);
  }
}

module.exports = ArtistRepository;