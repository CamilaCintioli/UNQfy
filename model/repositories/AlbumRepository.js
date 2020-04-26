const Album = require('../Album');

class AlbumRepository{
    constructor(){
        this.id = 0;
        this.albums = [];
    }

    addAlbum(albumData){
        console.log(albumData);
        const album = new Album(this.id, albumData.title, albumData.tracks, albumData.duration);
        console.log(album);
        this.albums.push(album);
        this.incrementId();
    }



    incrementId(){
        this.id ++;
    }


}

module.exports = AlbumRepository;