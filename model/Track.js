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

}

module.exports=Track;