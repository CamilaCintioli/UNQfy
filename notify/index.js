const express = require('express');
const bodyParser = require('body-parser');
const { notifyMiddleware } = require('./middlewares/notify');
const { verifyArtistIdMiddleware } = require('./middlewares/verifyArtistIdMiddleware');
const { errorHandlerMiddleware } = require('./middlewares/errorHandlerMiddleware');

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', notifyMiddleware, apiRouter);

apiRouter.post('/subscribe',
  verifyArtistIdMiddleware(),
  (req, res, next) => {
    res.locals.notificator.subscribe(req.body.artistId,req.body.email);
    res.status(200).send({statusCode: 200});
  });

app.use(errorHandlerMiddleware);

app.listen(5000, () => console.log('Notify escuchando en puerto 5000'));