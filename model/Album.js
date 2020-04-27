class Album{
  constructor(id,title,tracks,artistId){
    this.id = id;
    this.title=title;
    this.tracks = tracks;
    this.artistId = artistId;
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