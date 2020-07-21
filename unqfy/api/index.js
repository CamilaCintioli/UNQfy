const express = require('express');
const bodyParser = require('body-parser');


const artists = require('./routers/artists');
const albums = require('./routers/albums');
const tracks = require('./routers/tracks');
const playlists = require('./routers/playlists');
const users = require('./routers/users');
const { validationErrorHandler } = require('./middlewares/validation');
const { unqfyErrorHandler, notFoundErrorHandler, invalidBodyErrorHandler, defaultErrorHandler } = require('./middlewares/error');
const {unqfyMiddleware } = require('./middlewares/unqfy');

const app = express();
const apiRouter = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api',unqfyMiddleware, apiRouter);
apiRouter.get('/status', (req,res,next) => {
  res.status(200).send({statusCode:200})
})

apiRouter.use('/artists',artists);
apiRouter.use('/albums',albums);
apiRouter.use('/tracks', tracks);
apiRouter.use('/playlists', playlists);
apiRouter.use('/users', users);
app.use(notFoundErrorHandler);
app.use('/api', validationErrorHandler);
app.use('/api', unqfyErrorHandler);
app.use(invalidBodyErrorHandler);
app.use('/api', defaultErrorHandler);

app.listen(3000, () => {
  console.log('UNQfy listening on port 3000!');
});

