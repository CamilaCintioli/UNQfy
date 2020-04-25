const AddArtistCommand = require('./commands/AddArtistCommand');
const GetArtistByIdCommand = require('./commands/GetArtistByIdCommand');

class ConsoleCommandHandler{
  getCommand(commandLine){
    switch(commandLine){
    case 'addArtist':
      return new AddArtistCommand();
    case 'getArtistById':
      return new GetArtistByIdCommand();
    }
  }
}

module.exports=ConsoleCommandHandler;