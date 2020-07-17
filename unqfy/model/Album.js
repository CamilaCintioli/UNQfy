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

  getTitle(){
    return this.title;
  }

  edit(albumData){
    Object.keys(albumData).forEach(key => this.editAux(key, albumData[key]));
  }

  editAux(key, data){
    switch (key){
    case 'title':
      this.setTitle(data);
      break;
    case 'year':
      this.setYear(parseInt(data));
      break;
    }
  }

  hasTrackWithTitle(title){
    return !!this.tracks.find(track => track.getTitle() === title);
  }

}

module.exports = Album;