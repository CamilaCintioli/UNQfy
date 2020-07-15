const rp = require('request-promise');
const CronJob = require('cron').CronJob;
const { getPreviousState, setState, states, getServices } = require('./services');
const { notifyServiceStartedWorking, notifyServiceFailure } = require('./notify');


/**
 * @returns {Promise<{ [service: string]: string }>} el estado de cada servicio.
 */
function getServicesStatus() {
  const serviceEntries = Object.entries(getServices());

  return Promise.all(serviceEntries.map(([serviceName, serviceUrl]) =>
    getServiceStatus(serviceUrl)
      .then(status => [serviceName, status])))
    .then((servicesStatus) => Object.fromEntries(servicesStatus));
}

/**
 * @param {string} serviceUri
 */
function getServiceStatus(serviceUri) {
  const options = {
    method: 'GET',
    uri: serviceUri,
    simple: false,
    timeout: 1000,
  };
  return rp.get(options)
    .then(() => states.RUNNING)
    .catch(() => states.STOPPED);
}

const job = new CronJob(
  '0/3 * * * * *',
  notifyServicesStatus
);

function activate(){
  job.start();
}

function deactivate(){
  job.stop();
}

function notifyServicesStatus(){
  getServicesStatus()
    .then((servicesStatus) => {

      Object.entries(servicesStatus)
        .forEach(([serviceName,serviceStatus]) => {

          if(getPreviousState(serviceName) === states.STOPPED && serviceStatus === states.RUNNING){
            notifyServiceStartedWorking(serviceName);
          }
          if(getPreviousState(serviceName) === states.RUNNING && serviceStatus === states.STOPPED){
            notifyServiceFailure(serviceName);
          }

          setState(serviceName,serviceStatus);
        });
    });
}

module.exports = { getServicesStatus, activate, deactivate };
