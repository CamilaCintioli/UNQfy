const express = require('express');
const bodyParser = require('body-parser');
const { notifyMiddleware } = require('./middlewares/notify');
const { verifyArtistIdMiddleware } = require('./middlewares/verifyArtistIdMiddleware');
const { errorHandlerMiddleware, notifyError } = require('./middlewares/errorHandlerMiddleware');
const { createValidationMiddleware, validationErrorHandler } = require('./middlewares/validation');
const { emailSenderMiddleware } = require('./middlewares/emailSenderMiddleware');
const { subscriptionSchema } = require('./schemas');

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', notifyMiddleware, apiRouter);

apiRouter.post('/subscribe',
  createValidationMiddleware(subscriptionSchema),
  verifyArtistIdMiddleware(),
  (req, res, next) => {
    res.locals.notificator.subscribe(req.body.artistId,req.body.email);
    res.status(200).send({statusCode: 200});
  });

apiRouter.post('/unsubscribe',
  createValidationMiddleware(subscriptionSchema),
  verifyArtistIdMiddleware(),
  (req,res,next) => {
    res.locals.notificator.unsubscribe(+req.body.artistId,req.body.email);
    res.status(200).send({statusCode: 200});
  }
);

apiRouter.route('/subscriptions')
  .get(
    verifyArtistIdMiddleware(),
    (req,res) => {
      const subscribers = res.locals.notificator.getSubscribersForArtistId(+req.query.artistId);
      res.status(200).send({statusCode:200,body:subscribers});
    }
  )
  .delete(
    verifyArtistIdMiddleware(),
    (req,res) => {
      res.locals.notificator.deleteSubscribersOfArtistId(+req.body.artistId);
      res.status(200).send({statusCode:200});
    }
  );

apiRouter.post('/notify', 
  verifyArtistIdMiddleware(),
  emailSenderMiddleware(),
  (req,res, next) => {
    res.locals.notificator.notify(req.body.artistId,req.body.subject, req.body.message)
      .then(() => res.status(200).send({statusCode:200}))
      .catch((err) => next(notifyError(err)));
  }
);
apiRouter.get('/status', 
  (req, res, next) => {
    res.status(200).send({statusCode:200});
  }
);

app.use(validationErrorHandler);
app.use(errorHandlerMiddleware);

app.listen(5000, () => console.log('Notify escuchando en puerto 5000'));