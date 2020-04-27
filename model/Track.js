class Track{
  constructor(id,title,genres,duration, albumId){
    this.id=id;
    this.title=title;
    this.genres=genres;
    this.duration=duration;
    this.albumId = albumId;
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

  

}

module.exports=Track;