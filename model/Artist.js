class Artist{
  constructor(id, name, lastname, country){
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.country = country;
    this.albumsIds = [];
  }

  getFullName(){
    return `${this.name} ${this.lastname}`;
  }

  getId(){
    return this.id;
  }

  getAlbumsIds(){
    return this.albumsIds;
  }

  addAlbumId(albumId){
    this.albumsIds.push(albumId);
  }


  setName(name){
    this.name = name;
  }

  setLastname(lastname){
    this.lastname = lastname;
  }

  setCountry(country){
    this.country = country
  }
}

module.exports = Artist;