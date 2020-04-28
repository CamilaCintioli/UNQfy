class Album{
  constructor(id,title,year){
    this.id = id;
    this.title=title;
    this.tracks = [];
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

  addTrackId(trackId){
    this.tracks.push(trackId);
  }

}

module.exports = Album;