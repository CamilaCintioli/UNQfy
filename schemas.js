const yup = require('yup');

const playlistSchema = yup.object({
  title:yup.string().trim().required('El titulo es requerido'),
  duration: yup.number().min(0),
  genres: yup.array(yup.string()).when('duration',{
    is: (duration) => !!duration ,
    then: yup.array(yup.string()).min(1).required('Al menos un genero es requerido'),
    otherwise: yup.array().notRequired()
  }),
  tracks: yup.array(yup.number()).when('duration',{
    is: (duration) => !duration,
    then: yup.array(yup.number()).min(1).required('Al menos un track id es requerido'),
    otherwise: yup.array().notRequired()
  })
});
  
module.exports = {playlistSchema};