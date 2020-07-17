const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../../unqfy'); // importamos el modulo unqfy

function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}
  
function unqfyMiddleware(req, res, next) {
  res.locals.unqfy = getUNQfy();
  next();
}

module.exports = {unqfyMiddleware};