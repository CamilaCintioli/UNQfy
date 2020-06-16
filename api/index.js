const express = require('express');
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const bodyParser = require('body-parser');

const unqmod = require('../unqfy'); // importamos el modulo unqfy
const artists = require('./artists');
const albums = require('./albums');
const tracks = require('./tracks');
const playlists = require('./playlists');
const users = require('./users');
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

function notFoundHandler(req,res){
  res.status(404).send({status:404,errorCode:'RESOURCE_NOT_FOUND'});
}

function defaultError(err,req,res,next){
  res.status(500).send({status:500,errorCode:'INTERNAL_SERVER_ERROR'});
}

function invalidJsonError(err, req, res, next){
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, errorCode: 'BAD_REQUEST' });
  }
  next();
}

app.use('/api',unqfyMiddleware, apiRouter);
apiRouter.use('/artists',artists);
apiRouter.use('/albums',albums);
apiRouter.use('/tracks', tracks);
apiRouter.use('/playlists', playlists);
apiRouter.use('/users', users);
app.use(notFoundHandler);
app.use('/api', validationErrorHandler);
app.use('/api', unqfyErrorHandler);
app.use(invalidJsonError);
app.use('/api', defaultError);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

