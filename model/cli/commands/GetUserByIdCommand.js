class GetUserByIdCommand{
  execute(args, unqfy){
    unqfy.getUserById(parseInt(args[0]),true);
  }
}

module.exports = GetUserByIdCommand;