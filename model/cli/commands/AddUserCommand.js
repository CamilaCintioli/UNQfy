class AddUserCommand{
  execute(args, unqfy){
    const [name,lastname] = args;
    unqfy.addUser({
      name,
      lastname,
    });
    
    unqfy.save('data.json');
    
  }
}

module.exports = AddUserCommand;
