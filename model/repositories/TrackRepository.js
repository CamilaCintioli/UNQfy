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
        this.incrementId();
    }

    getTrackById(trackId){
        return this.tracks.find (({id}) => id === trackId);
    }

    getTracksMatchingGenres(genres){
        this.tracks.filter(track => track.haveAnyGenres(genres));
    }

    


    incrementId(){
        this.id ++;
    }

}

module.exports = TrackRepository;