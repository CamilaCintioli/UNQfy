
function notifyServiceFailure(service){
  sendNotification(` -- ${service} ha dejado de funcionar`);
}
  
function notifyServiceStartedWorking(service){
  sendNotification(` -- ${service} ha vuelto a la normalidad`);
}
  
function sendNotification(message){
  console.log(message);
}

module.exports = { notifyServiceFailure, notifyServiceStartedWorking };
