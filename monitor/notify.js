const rp = require("request-promise");
const {slackUrl} = require("./slackUrl");

function notifyServiceFailure(service){
  sendNotification(new Date().getHours() + ':' + new Date().getMinutes() + ` -- ${service} ha dejado de funcionar`);
}
  
function notifyServiceStartedWorking(service){
  sendNotification(new Date().getHours() + ':' + new Date().getMinutes() + ` -- ${service} ha vuelto a la normalidad`);
}
  
function sendNotification(message){
  const options = {
    method:'POST',  
    url: slackUrl,
    body: {
      text: message,
    },
    json: true,
  };
  rp.post(options).then(response => {
    console.log('cool');
  }).catch(err => {
    console.log('algo malio sal', err.error, err.statusCode);
  });
}



module.exports = { notifyServiceFailure, notifyServiceStartedWorking };
