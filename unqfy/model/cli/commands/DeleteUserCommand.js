class DeleteUserCommand{
    execute(args, unqfy){
        unqfy.deleteUser(parseInt(args[0]));
        unqfy.save('data.json');
    }
}

module.exports = DeleteUserCommand;