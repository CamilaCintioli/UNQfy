const { DuplicatedAlbum, DuplicateSuscriber } = require("./Exceptions");
//const NotifyService = require("./services/NotifyService");

class Artist{

  constructor(id, name, country){
    this.id = id;
    this.name = name;
    this.country = country;
    this.albums = [];
    this.suscribers = [];
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

    if(this.albums.map(album => album.title).includes(album.title)){
      throw new DuplicatedAlbum(this.albums.find(({title}) => title === album.title));
    }
    this.discribers.forEach(suscriber => suscriber.update(this,  album))
    this.albums.push(album);
  }

  addSuscribe(suscriber){
    if(this.suscribers.includes(suscriber)){
      throw new DuplicateSuscriber(suscriber);
    }
    this.suscribers.push(suscriber);    
  }

  unSuscribe(suscripterData){
    this.suscribers = this.suscribers.filter((suscripter) => suscripter == suscripterData)
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
