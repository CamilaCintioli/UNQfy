class AddUserCommand{
  execute(args, unqfy){
    const [,name,, lastname] = args;
    unqfy.addUser({
      name,
      lastname,
    });
    
  }
}

module.exports = AddUserCommand;
