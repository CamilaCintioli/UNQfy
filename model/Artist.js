class Artist{
  constructor(id, name, lastname, country){
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.country = country;
    this.albums = [];
  }
}

module.exports = Artist;