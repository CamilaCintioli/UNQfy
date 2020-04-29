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


  addTrack(track){
    this.tracks.push(track);
  }

}

module.exports = Album;