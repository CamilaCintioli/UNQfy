const Track = require('../Track');

class TrackRepository{
  constructor(){
    this.id = 0;
    this.tracks = [];

  }

  addTrack(albumId, trackData){

    const track = new Track(this.id, trackData.title, trackData.genres, trackData.duration, albumId);
    this.tracks.push(track);
    console.log(track);
    this.incrementId();
  }

  getTrackById(trackId){
    return this.tracks.find (({id}) => id === trackId);
  }

  getTracksMatchingGenres(genres){
    return this.tracks.filter(track => track.haveAnyGenres(genres));
  }

  getTracksMatchingArtist(albumsIds){
    
    return this.tracks.filter(track => track.hasAlbumId(albumsIds));
  }

    


  incrementId(){
    this.id ++;
  }

}

module.exports = TrackRepository;