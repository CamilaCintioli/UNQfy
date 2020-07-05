const express = require('express');
const bodyParser = require('body-parser');
const yup = require('yup');
const { notifyMiddleware } = require('./middlewares/notify');
const { verifyArtistIdMiddleware } = require('./middlewares/verifyArtistIdMiddleware');
const { errorHandlerMiddleware } = require('./middlewares/errorHandlerMiddleware');
const { createValidationMiddleware, validationErrorHandler } = require('../api/middlewares/validation');

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', notifyMiddleware, apiRouter);

apiRouter.post('/subscribe',
  createValidationMiddleware(yup.object({
    artistId:yup.string().required('El id del artista es obligatorio'),
    email: yup.string().email('Debe ser un mail valido').required('El email es obligatorio')
  })),
  verifyArtistIdMiddleware(),
  (req, res, next) => {
    res.locals.notificator.subscribe(req.body.artistId,req.body.email);
    res.status(200).send({statusCode: 200});
  });

app.use(validationErrorHandler);
app.use(errorHandlerMiddleware);

app.listen(5000, () => console.log('Notify escuchando en puerto 5000'));