class User{
  constructor(id, name, lastname){
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.tracksHeard = [];
    this.timeTrackHeard = 0;
  }

  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }
   
    
  addTrackHeard(track){
    return this.tracksHeard.push(track);
  }

  getTracks(){
    const tracks2 = [];
    for (const track of this.tracksHeard){
      if (!tracks2.includes(track))
        tracks2.push(track);
    }
    return tracks2;
  }

  timesHeardATrack(trackId){
    return this.tracksHeard.filter(track => track.getId() === trackId).length;
  }


  addTimeTrackHeard(trackData){
    this.timeTrackHeard = this.timeTrackHeard + trackData.getDuration();
  }

}

module.exports = User;


