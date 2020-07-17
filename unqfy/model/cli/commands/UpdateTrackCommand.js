class UpdateTrackCommand{
    execute(args, unqfy){
        const trackId = parseInt(args[0]);

        unqfy.updateTrack(trackId, this.getTrackData(args.splice(2)));
    }



    getTrackData(args){
        const keys = [];
        const values = [];
        const trackData = {};

        args.forEach((str, index) => index%2 === 0? keys.push(str) : values.push(str));

        keys.forEach((key, index) => trackData[key] = values[index]);

        return trackData;
    }

  
}

  module.exports = UpdateTrackCommand;