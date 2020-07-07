let isActivated = true;

function activate(){
  isActivated = true;
}

function deactivate(){
  isActivated = false;
}

module.exports = { activate, deactivate };