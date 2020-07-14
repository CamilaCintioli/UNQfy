const { saveLogLocally } = require('./localLogger');
const { saveLoggly } = require('./loggly');

let isActivated = true;

function activate(){
  isActivated = true;
}

function deactivate(){
  isActivated = false;
}

function log(level,message){
  if(isActivated){
    saveLogLocally(level,message);
    saveLoggly(level,message);
  }
}

module.exports = { activate, deactivate, log };