const AddArtistCommand = require('./commands/AddArtistCommand');
const GetArtistByIdCommand = require('./commands/GetArtistByIdCommand');
const AddTrackCommand = require('./commands/AddTrackCommand');
const AddAlbumCommand = require('./commands/AddAlbumCommand');
const GetAlbumByIdCommand = require ('./commands/GetAlbumByIdCommand');
const GetTrackByIdCommand = require ('./commands/GetTrackByIdCommand');
const GetTracksMatchingGenresCommand = require ('./commands/GetTracksMatchingGenresCommands');
const GetTracksMatchingArtistCommand = require ('./commands/GetTracksMatchingArtistCommand');
const UpdateArtistCommand = require ('./commands/UpdateArtistCommand');
const DeleteArtistCommand = require('./commands/DeleteArtistCommand');
const UpdateTrackCommand = require ('./commands/UpdateTrackCommand');
const UpdateAlbumCommand = require ('./commands/UpdateAlbumCommand');
const DeleteAlbumCommand = require ('./commands/DeleteArtistCommand');
const DeletePlaylistCommand = require ('./commands/DeletePlaylistCommand');
const DeleteTrackCommand = require ('./commands/DeleteTrackCommand');
const CreatePlaylistCommand = require('./commands/CreatePlaylistCommand');
const GetArtistsCommand = require ('./commands/GetArtistsCommand');
const GetPlaylistsCommand = require ('./commands/GetPlaylistsCommand');
const GetAlbumsCommand = require ('./commands/GetAlbumsCommand');
const GetPlaylistByIdCommand = require ('./commands/GetPlaylistByIdCommand');
const AddUserCommand = require ('./commands/AddUserCommand');
const RegisterTrackByUserCommand = require ('./commands/RegisterTrackByUserCommand');
const GetUserByIdCommand = require ('./commands/GetUserByIdCommand');

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
    case 'deleteAlbum':
      return new DeleteAlbumCommand();
    case 'deletePlaylist':
      return new DeletePlaylistCommand();
    case 'deleteTrack':
      return new DeleteTrackCommand();
    case 'createPlaylist':
      return new CreatePlaylistCommand();
    case 'getArtists':
      return new GetArtistsCommand();
    case 'getPlaylists':
      return new GetPlaylistsCommand();  
    case 'getAlbums':
      return new GetAlbumsCommand();
    case 'getPlaylistById':
      return new GetPlaylistByIdCommand();
    case 'addUser':
      return new AddUserCommand();
    case 'registerTrackByUser':
      return new RegisterTrackByUserCommand();
    case 'getUserById':
      return new GetUserByIdCommand();
    }

  }

}



module.exports=ConsoleCommandHandler;