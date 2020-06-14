const express = require('express');
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const bodyParser = require('body-parser');

const unqmod = require('../unqfy'); // importamos el modulo unqfy
const artists = require('./artists');
const albums = require('./albums');
const { validationErrorHandler } = require('./validation');
const { unqfyErrorHandler } = require('./error');

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getUNQfyAux(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function unqfyMiddleware(req, res, next) {
  res.locals.unqfy = getUNQfyAux();
  next();
}

app.use('/api',unqfyMiddleware, apiRouter);
apiRouter.use('/artists',artists);
apiRouter.use('/albums',albums);
app.use('/api', validationErrorHandler);
app.use('/api', unqfyErrorHandler);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

