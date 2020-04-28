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

  hasTrack(trackAsked){
    console.log('canciones de playlist', this.tracks);
    return this.tracks.includes(trackAsked.getId());
  }

}



module.exports=Playlist;