const Playlist = require('../Playlist');

class PlaylistRepository{
  constructor(){
    this.id = 0;
    this.playlists = [];
  }

  getPlayListById(playlistId){
    return this.playlists.find(({id}) => id === playlistId);
  }

  deletePlaylist(playlistId){
    this.playlists = this.playlists.filter(playlist => playlist.getId() !== playlistId);
    console.log(this.playlists);
  }

  

  incrementId(){
    this.id ++;
  }

  createPlaylist(name, tracks){

    const tracksIds = tracks.map((track) => track.getId());
    const duration = tracks.map((track) => track.getDuration()).reduce((acc, curr) => curr + acc, 0 );
    const newPlaylist = new Playlist(this.id, name, tracksIds, duration);

    this.playlists.push(newPlaylist);
    this.incrementId();
    console.log(newPlaylist);
  }

  getPlaylists(){
    return this.playlists;
  }

}

module.exports = PlaylistRepository;