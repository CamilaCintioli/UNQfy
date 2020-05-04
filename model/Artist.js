class Artist{
  constructor(id, name, country){
    this.id = id;
    this.name = name;
    this.country = country;
    this.albums = [];
  }

  getName(){
    return this.name;
  }

  getId(){
    return this.id;
  }

  getAlbums(){
    return this.albums;
  }

  addAlbum(album){
    this.albums.push(album);
  }


  setName(name){
    this.name = name;
  }

  setCountry(country){
    this.country = country;
  }

  deleteAlbum(albumId){
    this.albums = this.albums.filter((album) => album.getId() !== albumId);
  }

  edit(artistData){
    Object.keys(artistData).forEach(key => this.editAux(key, artistData[key]));
  }

  editAux(key, data) {
    switch (key) {
    case 'name':
      this.setName(data);
      break;
    case 'country':
      this.setCountry(data);
      break;
    }
  }
}

module.exports = Artist;
