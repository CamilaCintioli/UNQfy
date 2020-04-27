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

  editArtist(artistId, artistData){
    const artist = this.getArtistById(artistId);
    
    Object.keys(artistData).forEach(key => this.updateArtist(key, artist, artistData[key]));
    console.log('the new artist is: ', artist);
  }

  updateArtist(key, artist, data){
    switch (key){
    case 'name':
      artist.setName(data);
      break;
    case 'lastname':
      artist.setLastname(data);
      break;
    case 'country':
      artist.setCountry(data);     
      break; 
    }
  }

  deleteArtist(artistId){
    this.artists = this.artists.filter((artist) => artist.id !== artistId);
    console.log('Artista borrado exitosamente');
  }

}

module.exports = ArtistRepository;
