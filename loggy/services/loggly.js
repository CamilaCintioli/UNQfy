const winston  = require('winston');
const { Loggly } = require('winston-loggly-bulk');

winston.add(new Loggly({
  token: 'f736f297-6879-43a5-8876-d04584d51e24',
  subdomain: 'unqfy20',
  tags: ['UNQFY'],
  json: true
}));

function saveLoggly(level,message) {
  console.log('Guardando en loggly');
  console.log(level,message);
  winston.log({level, message});
}

module.exports = { saveLoggly };