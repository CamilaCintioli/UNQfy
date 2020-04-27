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

  editTrack(trackId, trackData){
    const track = this.getTrackById(trackId);
    
    Object.keys(trackData).forEach(key => this.updateTrack(key, track, trackData[key]));
    console.log('the new track is: ', track);
  }  

  updateTrack(key,track, data){
    switch (key){
      case 'title':
        track.setTitle(data);
        break;
      case 'duration':
        track.setDuration(data);
        break;
      case 'genres':
        track.setGenres(data);     
        break; 
      case 'albumId':
        track.setAlbumId(data);
        break;
      }
  }


  incrementId(){
    this.id ++;
  }

}

module.exports = TrackRepository;