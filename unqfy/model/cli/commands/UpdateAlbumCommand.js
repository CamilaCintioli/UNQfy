class UpdateAlbumCommand{
    execute(args, unqfy){
        const albumId = parseInt(args[0]);

        unqfy.updateAlbum(albumId, this.getAlbumData(args.splice(2)));
    }



    getAlbumData(args){
        const keys = [];
        const values = [];
        const albumData = {};

        args.forEach((str,index) => index%2 === 0? keys.push(str) : values.push(str));

        keys.forEach((key, index) => albumData[key] = values[index]);

        return albumData;
    }
}





  module.exports = UpdateAlbumCommand;
  