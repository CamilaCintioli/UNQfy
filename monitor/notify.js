const rp = require('request-promise')

function notifyServiceFailure(service){
  sendNotification(new Date().getHours() + ':' + new Date().getMinutes() + ` -- ${service} ha dejado de funcionar`);
}
  
function notifyServiceStartedWorking(service){
  sendNotification(new Date().getHours() + ':' + new Date().getMinutes() + ` -- ${service} ha vuelto a la normalidad`);
}
  
function sendNotification(message){
  /*const options = {
    url: 'https://hooks.slack.com/services/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',
    body: {
      text: message,
    },
    json: true,
  };
  rp.post(options).then(response => {
    console.log('cool');
  }).catch(err => {
    console.log('algo malio sal');
  });*/
  console.log(message)
}



module.exports = { notifyServiceFailure, notifyServiceStartedWorking };
