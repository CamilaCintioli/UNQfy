class Track{
  constructor(id,title,genres,duration){
    this.id=id;
    this.title=title;
    this.genres=genres;
    this.duration=duration;
  }


  haveAnyGenres(genresOrders){
    const genresGeneral = new Set(this.genres.concat(genresOrders));
    console.log (genresOrders);
    console.log (genresGeneral);
    return genresGeneral.lenght < (genresOrders.lenght + this.genres.lenght);
  }

}

module.exports=Track;