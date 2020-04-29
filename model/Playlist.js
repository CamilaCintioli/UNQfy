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

}



module.exports=Playlist;