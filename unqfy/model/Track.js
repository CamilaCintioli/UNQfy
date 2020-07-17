const {searchLyricsForTrackId} = require('./services/musicMatchService');

class Track{
  constructor(id,title,genres,duration){
    this.id=id;
    this.title=title;
    this.genres=genres;
    this.duration=duration;
    this.lyrics=null;
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

  edit(trackData){
    Object.keys(trackData).forEach(key => this.editAux(key, trackData[key]));
  }

  editAux(key, data) {
    switch (key) {
    case 'title':
      this.setTitle(data);
      break;
    case 'genres':
      this.setGenres(data);
      break;
    }
  }

  getLyrics(trackId){

    if(this.lyrics){
      return this.lyrics;
    }

    return searchLyricsForTrackId(trackId)
      .then(lyrics => {this.lyrics = lyrics; 
        return this.lyrics;})
      .catch(error => {
        this.lyrics = 'Esta cancion no tiene letra';
        return this.lyrics;
      });
  }

  
}

module.exports=Track;