class Track{
  constructor(id,title,genres,duration){
    this.id=id;
    this.title=title;
    this.genres=genres;
    this.duration=duration;
  }


  getId(){
    return this.id;
  }

  setTitle(title){
    this.title = title;
  }

  setDuration(duration){
    this.duration = duration;
  }

  setGenres(genres){
    this.genres = genres;
  }

  setAlbumId(albumId){
    this.albumId = albumId;
  }

  getDuration(){
    return this.duration;
  }

  haveAnyGenres(genres){
    const allGenres = new Set(this.genres.concat(genres));
    
    return allGenres.size !== (genres.length + this.genres.length);
  }

  getTitle(){
    return this.title;
  }


}

module.exports=Track;