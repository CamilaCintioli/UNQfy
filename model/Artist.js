class Artist{
  constructor(id, name, lastname, country){
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.country = country;
    this.albums = [];
  }

  getFullName(){
    return `${this.name} ${this.lastname}`;
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

  setLastname(lastname){
    this.lastname = lastname;
  }

  setCountry(country){
    this.country = country;
  }

  deleteAlbum(albumId){
    this.albums = this.albums.filter((album) => album.getId() !== albumId);
  }
}

module.exports = Artist;
