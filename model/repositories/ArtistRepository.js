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

  getArtistsFromName(artistName){
    return this.artists.filter(artist => artist.getFullName().includes(artistName));
  }

  updateArtistAlbums(artistId, albumId){
    this.artists.find(artist => artist.getId() === artistId).addAlbumId(albumId);
  }

}

module.exports = ArtistRepository;