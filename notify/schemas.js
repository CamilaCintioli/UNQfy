const yup = require('yup');

const subscriptionSchema = yup.object({
  artistId:yup.string().required('El id del artista es obligatorio'),
  email: yup.string().email('Debe ser un mail valido').required('El email es obligatorio')
});

module.exports = {subscriptionSchema};