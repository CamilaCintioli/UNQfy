const Album = require('../Album');

class AlbumRepository{
  constructor(){
    this.id = 0;
    this.albums = [];
  }

  addAlbum(artistId, albumData){
    const album = new Album(this.id, albumData.title, albumData.tracks, artistId);
    console.log(album);
    this.albums.push(album);
    this.incrementId();
    return album;
  }

  getAlbumById(albumId){
    return this.albums.find(({id}) => id === albumId);

  }


  incrementId(){
    this.id ++;
  }


}

module.exports = AlbumRepository;