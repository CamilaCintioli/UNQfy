const AddArtistCommand = require('./commands/AddArtistCommand');
const GetArtistByIdCommand = require('./commands/GetArtistByIdCommand');
const AddTrackCommand = require('./commands/AddTrackCommand');
const AddAlbumCommand = require('./commands/AddAlbumCommand');

class ConsoleCommandHandler{
  getCommand(commandLine){
    switch(commandLine){
    case 'addArtist':
      return new AddArtistCommand();
    case 'getArtistById':
      return new GetArtistByIdCommand();
    case 'addTrack':
      return new AddTrackCommand();
    case 'addAlbum':
      return new AddAlbumCommand();
    case 'addPlaylist':
      return new AddPlaylist();
    }

  }

  

  
}



module.exports=ConsoleCommandHandler;