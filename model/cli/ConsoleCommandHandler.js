const AddArtistCommand = require('./commands/AddArtistCommand');
const GetArtistByIdCommand = require('./commands/GetArtistByIdCommand');
const AddTrackCommand = require('./commands/AddTrackCommand');
const AddAlbumCommand = require('./commands/AddAlbumCommand');
const GetAlbumByIdCommand = require ('./commands/GetAlbumByIdCommand');
const GetTrackByIdCommand = require ('./commands/GetTrackByIdCommand');
const GetTracksMatchingGenresCommand = require ('./commands/GetTracksMatchingGenresCommands');
const GetTracksMatchingArtistCommand = require ('./commands/GetTracksMatchingArtistCommand');
const UpdateArtistCommand = require ('./commands/UpdateArtistCommand');

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
    }

  }

}



module.exports=ConsoleCommandHandler;