class Playlist{
  constructor(id,title,tracks,duration){
    this.id=id;
    this.title=title;
    this.tracks=tracks;
    this.duration=duration;
  }

  getId(){
    return this.id;
  }

  getDuration(){
    return this.duration;
  }

  hasTrack(track){
    return this.tracks.includes(track);
  }

  deleteTrack(trackId){
    const track = this.tracks.find(track => track.getId() === trackId);
    
    if(track){
      const duration = track.getDuration();
      this.tracks = this.tracks.filter(track => track.getId() !== trackId);
      this.duration-=duration;
    }
    
  }

  deleteTracks(tracks){
    tracks.map(track => track.getId()).forEach(trackId => this.deleteTrack(trackId));
  }

  getTitle(){
    return this.title;
  }
}



module.exports=Playlist;