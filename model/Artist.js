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

  addAlbum(album){
    this.albumsIds.push(album);
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