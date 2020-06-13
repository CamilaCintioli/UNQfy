const express = require('express');
const app = express();
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../unqfy'); // importamos el modulo unqfy
const apiRouter = express.Router();
const artists = require('./artists');
const albums = require('./albums');
const tracks = require('./tracks');
const playList = require('./playLists');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getUNQfyAux(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function getUNQfy(req, res, next) {
  res.locals.unqfy = getUNQfyAux();
  next();
}

app.use('/api',getUNQfy,apiRouter);
apiRouter.use('/artists',artists);
apiRouter.use('/albums',albums);
apiRouter.use('/tracks', tracks);
apiRouter.use('./playLists', playLists);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

