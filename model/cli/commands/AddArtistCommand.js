const yup = require('yup');

const schema = yup.object({
  name: yup.string().trim().required('El nombre del artista es obligatorio'),
  country: yup.string().trim().required('El país del artista es obligatorio')
});

class AddArtistCommand {
  execute(args, unqfy) {
    const [name, country] = args;
    try {
      schema.validateSync({name,country},{abortEarly:false});
    }
    catch(error){
      error.errors.forEach(error => console.error(error));
      return;
    }

    unqfy.addArtist({name,country});
    
  }
}
module.exports = AddArtistCommand;