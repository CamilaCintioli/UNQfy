const fs = require('fs');

const services = {};

const states = {
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED'
};

function getPreviousState(service){
  return services[service] || states.RUNNING;
}

function setState(service, status){
  services[service] = status;
}

let monitoredServices = null;
function getServices(){
  if(!monitoredServices) {
    monitoredServices = JSON.parse(fs.readFileSync('services.json'));
  }
  return monitoredServices;
}

module.exports = { getPreviousState, setState, states, getServices };
