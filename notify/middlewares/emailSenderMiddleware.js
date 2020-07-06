const EmailSender = require('../email/EmailSender');

function emailSenderMiddleware() {
  return (req,res,next) => {
    res.locals.notificator.setEmailSender(EmailSender.load());
    next();
  };
}

module.exports = {emailSenderMiddleware};