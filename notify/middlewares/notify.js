const fs = require('fs'); 
const Notificator = require('../../notificator/NotificationService'); 

function getNotificator(filename = 'notification.json') {
  let notificator = new Notificator();
  if (fs.existsSync(filename)) {
    notificator = Notificator.load(filename);
  }
  return notificator;
}
  
function notifyMiddleware(req, res, next) {
  res.locals.notificator = getNotificator();
  next();
}

module.exports = {notifyMiddleware};