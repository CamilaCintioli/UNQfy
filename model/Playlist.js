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

}



module.exports=Playlist;