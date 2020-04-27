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
}

module.exports = Album;