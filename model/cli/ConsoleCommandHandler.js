const AddArtistCommand = require('./commands/AddArtistCommand');
const GetArtistByIdCommand = require('./commands/GetArtistByIdCommand');
const AddTrackCommand = require('./commands/AddTrackCommand');
const AddAlbumCommand = require('./commands/AddAlbumCommand');
const GetAlbumByIdCommand = require ('./commands/GetAlbumByIdCommand');
const GetTrackByIdCommand = require ('./commands/GetTrackByIdCommand');
const GetTracksMatchingGenresCommand = require ('./commands/GetTracksMatchingGenresCommands');
const GetTracksMatchingArtistCommand = require ('./commands/GetTracksMatchingArtistCommand');
const UpdateArtistCommand = require ('./commands/UpdateArtistCommand');
<<<<<<< HEAD
const DeleteArtistCommand = require('./commands/DeleteArtistCommand');
=======
const UpdateTrackCommand = require ('./commands/UpdateTrackCommand');
const UpdateAlbumCommand = require ('./commands/UpdateAlbumCommand');
>>>>>>> 8262f1e2940821dd2bff2df51d87b32c97490b16

class ConsoleCommandHandler{
  getCommand(commandLine){
    switch(commandLine){
    case 'addArtist':
      return new AddArtistCommand();
    case 'getArtistById':
      return new GetArtistByIdCommand();
    case 'addTrack':
      return new AddTrackCommand();
    case 'getTrackById':
      return new GetTrackByIdCommand();
    case 'addAlbum':
      return new AddAlbumCommand();
    case 'getAlbumById':
      return new GetAlbumByIdCommand();
    case 'getTracksMatchingGenres':
      return new GetTracksMatchingGenresCommand();
    case 'getTracksMatchingArtist':
      return new GetTracksMatchingArtistCommand();
    case 'updateArtist':
      return new UpdateArtistCommand();
    case 'deleteArtist':
      return new DeleteArtistCommand();
    case 'updateTrack':
      return new UpdateTrackCommand();
    case 'updateAlbum':
      return new UpdateAlbumCommand();
    }

  }

}



module.exports=ConsoleCommandHandler;