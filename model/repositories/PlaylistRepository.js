const Playlist = require('../Playlist');

class PlaylistRepository{
    constructor(){
        this.id = 0;
        this.traks = [];
        this.palylists = [];
    }

    addtrackToPlaylist(playlistId, trackData){
        const track = new Track(trackData.id, trackData.title, trackData.genres, trackData.duration, 
            trackData.albumId);
        
        this.tracks.push(track);
    }

    getPlayListById(playlistId){
        return this.playlists.find (({id}) => id === playlistId);
    }

    deletePlaylist(playlistid){
        const playlist = this.getPlayListById(playlistId);

        this.playlists = this.playlists.filter(playlist => playlist.getId() !== playlistId);
    }

    incrementId(id){
        this.id ++;
    }



}
