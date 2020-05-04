class AddUserCommand{
    execute(args, unqfy){
        const [,name,, lastname] = args;
    unqfy.addUser({
      name,
      lastname,
    });
    console.log ("el user es ", lastname);
    }
}

module.exports = AddUserCommand;
