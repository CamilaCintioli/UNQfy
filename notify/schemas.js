const yup = require('yup');

const subscriptionSchema = yup.object({
  artistId:yup.string().required('El id del artista es obligatorio'),
  email: yup.string().email('Debe ser un mail valido').required('El email es obligatorio')
});

const notificationSchema = yup.object({
  artistId:yup.number().required('El id del artista es obligatorio'),
  subject:yup.string().required('El asunto es obligatorio'),
  message:yup.string().required('El mensaje es obligatorio')
})

module.exports = {subscriptionSchema, notificationSchema};