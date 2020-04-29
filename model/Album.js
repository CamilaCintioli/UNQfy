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

  getTracks(){
    return this.tracks;
  }

  addTrack(track){
    this.tracks.push(track);
  }

  setTitle(title){
    this.title = title;
  }

  setYear(year){
    this.year=year;
  }

  deleteTrack(trackId){
    this.tracks = this.tracks.filter((track) => track.getId() !== trackId);
  }

}

module.exports = Album;