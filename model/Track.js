class Track{
  constructor(id,title,genres,duration){
    this.id=id;
    this.title=title;
    this.genres=genres;
    this.duration=duration;
  }


  haveAnyGenres(genresOrders){
    const genresGeneral = new Set(this.genres.concat(genresOrders));
    
    return genresGeneral.size !== (genresOrders.length + this.genres.length);
  }

  hasAlbumId(albumsIds){
    return albumsIds.includes(this.albumId);
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

}

module.exports=Track;