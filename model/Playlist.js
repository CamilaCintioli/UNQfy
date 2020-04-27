class Playlist{
  constructor(id,title,tracks,duration){
    this.id=id;
    this.title=title;
    this.tracks=tracks;
    this.duration=duration;
  }

  getPlaylistId(){
    return Playlist.id;
  }



}



module.exports=Playlist;