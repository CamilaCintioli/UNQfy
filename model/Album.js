class Album{
  constructor(id,title,tracks,artistId, year){
    this.id = id;
    this.title=title;
    this.tracks = [];
    this.artistId = artistId;
    this.year = year;
  }

  getId(){
    return this.id;
  }

  setTitle(title){
    this.title = title;
  }

  setArtistId(artistId){
    this.artistId = artistId;
  }


}

module.exports = Album;