const fs = require('fs'); 
const NotifyService = require('../services/NotifyService');

function getNotificator(filename = 'notification.json') {
  return NotifyService.load(filename);
}
  
function notifyMiddleware(req, res, next) {
  res.locals.notificator = getNotificator();
  next();
}

module.exports = {notifyMiddleware};