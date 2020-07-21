const winston  = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'loggy-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/logs.log' }),
  ],
});

function saveLogLocally(level,message){
  logger.log({level,message});    
}

module.exports = { saveLogLocally };