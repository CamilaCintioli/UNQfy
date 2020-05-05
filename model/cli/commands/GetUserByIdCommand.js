class GetUserByIdCommand{
  execute(args, unqfy){
    console.log(unqfy.getUserById(parseInt(args[0])));
  }
}

module.exports = GetUserByIdCommand;