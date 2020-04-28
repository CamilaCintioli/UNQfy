const Track = require('../Track');

class TrackRepository{
  constructor(){
    this.id = 0;
    this.tracks = [];

  }

  addTrack(albumId, trackData){

    const track = new Track(this.id, trackData.title, trackData.genres, trackData.duration, albumId);
    this.tracks.push(track);
    this.addTrackToAlbumId(albumId, trackId);
    console.log(track);
    this.incrementId();
  }

  getTrackById(trackId){
    return this.tracks.find (({id}) => id === trackId);
  }

  getTracksMatchingGenres(genres){
    return this.tracks.filter(track => track.haveAnyGenres(genres));
  }

  getTracksMatchingAlbumById(albumsIds){
    
    return this.tracks.filter(track => track.hasAlbumId(albumsIds));
  }

  getAlbumIdMatchingByTracksId(tracksId){
    const track = this.getTrackById(tracksId);
    return this.track.albumId;
  }

  deleteTrack(trackId){
    
    this.tracks = this.tracks.filter(track => track.getId() !== trackId); 
    
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