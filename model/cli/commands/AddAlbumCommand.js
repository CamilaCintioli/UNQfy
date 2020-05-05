const yup = require('yup');

const schema = yup.object({
  artistId: yup.number().required('El id del artista es obligatorio').typeError('El id debe ser un numero'),
  title: yup.string().trim().required('El titulo del album es obligatorio'),
  year: yup.number().required('El año del album es obligatorio').typeError('El año debe ser un numero'), 
});

class AddAlbumCommand{
  execute(args, unqfy){
    const [artistId,title,year] = args;

    try {
      schema.validateSync({artistId:parseInt(artistId),title,year:parseInt(year)},{abortEarly:false});
    }
    catch(error){
      error.errors.forEach(error => console.error(error));
      return;
    }

    unqfy.addAlbum(parseInt(artistId),{
      title,
      year:parseInt(year),
    });
  }
}
  
module.exports=AddAlbumCommand;
