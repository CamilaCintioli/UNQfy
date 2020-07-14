const rp = require('request-promise');
const fs = require('fs');

let monitor = null;

/**
 * @returns {Promise<{ [service: string]: string }>} el estado de cada servicio.
 */
function getServicesStatus() {

  const services = JSON.parse(fs.readFileSync('services.json'));

  const serviceEntries = Object.entries(services);

  return Promise.all(serviceEntries.map(([serviceName, serviceUrl]) =>
    getServiceStatus(serviceUrl)
      .then(status => [serviceName, status])))
    .then((servicesStatus) => Object.fromEntries(servicesStatus));

}

function getServiceStatus(service) {
  const options = {
    method: 'GET',
    uri: service,
    simple: false,
    timeout: 1000,
  };
  return rp.get(options)
    .then(() => 'RUNNING')
    .catch(() => 'DEAD');
}



function activate(){
  monitor = setInterval(notifySlack, 2500)
}

function deactivate(){
  clearInterval(monitor)
  console.log("desactivando")
}



const services = {};

const dead = 'DEAD';
const running = 'RUNNING';

function getPreviousState(service){
  return services[service] || running;
}

function setState(service,status){
  services[service] = status;
}

function notifyServiceFailure(service){
  const date = new Date();
  sendSlackNotification(`${date.getHours()}:${date.getMinutes()} -- ${service} ha dejado de funcionar`);
}

function notifyServiceStartedWorking(service){
  const date = new Date();
  sendSlackNotification(`${date.getHours()}:${date.getMinutes()} -- ${service} ha vuelto a la normalidad`);
}

function sendSlackNotification(message){
  console.log(message);
}

function notifySlack(){

  getServicesStatus()
    .then((servicesStatus) => {

      Object.entries(servicesStatus)
        .forEach(([serviceName,serviceStatus]) => {

          if(getPreviousState(serviceName) === dead && serviceStatus === running){
            notifyServiceStartedWorking(serviceName);
          }
          if(getPreviousState(serviceName) === running && serviceStatus === dead){
            notifyServiceFailure(serviceName);
          }

          setState(serviceName,serviceStatus);

        });
    });
}

module.exports = { getServicesStatus, activate, deactivate };

