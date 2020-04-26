const Track = require('../Track');

class TrackRepository{
    constructor(){
        this.id = 0;
        this.tracks = [];

    }

    addTrack(trackData){
        console.log(trackData);
        const track = new Track(this.id, trackData.title, trackData.genres, trackData.duration);
        this.tracks.push(track);
        console.log(track);
        this.incrementarId();
    }

    incrementarId(){
        this.id = this.id + 1;
    }

}

module.exports = TrackRepository;