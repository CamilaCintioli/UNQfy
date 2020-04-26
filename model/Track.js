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

}

module.exports=Track;