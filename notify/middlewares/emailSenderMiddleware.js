const EmailSender = require('../email/EmailSender');

function emailSenderMiddleware(req, res, next) {
  res.locals.notificator.setEmailSender(EmailSender.load());
  next();
}

module.exports = {emailSenderMiddleware};