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

  deleteAlbum(albumId){
    this.albums = this.albums.filter(album => album.getId() !== albumId);
  }
  editAlbum(albumId, albumData){
    const album = this.getAlbumById(albumId);
    Object.keys(albumData).forEach(key => this.updateAlbum(key, album, albumData[key]));
    console.log('the new album is: ', album);
  }  
  

  updateAlbum(key, album, data){
    switch (key){
    case 'title':
      album.setTitle(data);
      break;
    case 'artistId':
      album.setArtistId(data);
      break;
    }
  }


  incrementId(){
    this.id ++;
  }


}

module.exports = AlbumRepository;