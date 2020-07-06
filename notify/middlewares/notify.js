const fs = require('fs'); 
const NotifyService = require('../NotifyService');
const EmailSender = require('../EmailSender');

function getNotificator(filename = 'notification.json') {
  return NotifyService.load(filename, EmailSender.load());
}
  
function notifyMiddleware(req, res, next) {
  res.locals.notificator = getNotificator();
  next();
}

module.exports = {notifyMiddleware};