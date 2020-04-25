const AddArtistCommand = require('./commands/AddArtistCommand');

class ConsoleCommandHandler{
  getCommand(commandLine){
    switch(commandLine){
    case 'addArtist':
      return new AddArtistCommand();
    }
  }
}

module.exports=ConsoleCommandHandler;