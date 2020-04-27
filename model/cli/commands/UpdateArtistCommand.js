class UpdateArtistCommand{
    execute(args,unqfy){
      const artistId = parseInt(args[1]);
  
      unqfy.updateArtist(artistId, this.getArtistData(args.splice(2)));
    }
  
    getArtistData(args){
      const keys = [];
      const values = [];
      const artistData = {};
      args.forEach((str, index) => index%2 === 0 ? keys.push(str) : values.push(str) );
  
      keys.forEach((key, index) => artistData[key]=values[index]);
  
      return artistData;
    }
  
  }

  module.exports = UpdateArtistCommand;
