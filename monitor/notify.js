const rp = require('request-promise');
const {slackUrl} = require('./slackUrl');

function notifyServiceFailure(service){
  sendNotification( `${getTime()} -- ${service} ha dejado de funcionar`);
}
  
function notifyServiceStartedWorking(service){
  sendNotification(`${getTime()} -- ${service} ha vuelto a la normalidad`);
}

function getTime(){
  
  return new Date().getHours()-3 + ':' + new Date().getMinutes();
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
    console.log('Notification sent');
  }).catch(err => {
    console.log('Notification failed to sent');
  });
}



module.exports = { notifyServiceFailure, notifyServiceStartedWorking };
