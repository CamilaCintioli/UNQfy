const express = require('express');
const bodyParser = require('body-parser');
const yup = require('yup');
const { activate, deactivate, log } = require('./services/loggyService');
const { createValidationMiddleware, validationErrorHandler } = require('./middlewares/validation');

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',apiRouter);

apiRouter.post('/activate',
  (req,res) => {
    activate();
    res.status(200).send({statusCode:200});
  });
apiRouter.post('/deactivate',
  (req,res) => {
    deactivate();
    res.status(200).send({statusCode:200});
  });

apiRouter.post('/log', createValidationMiddleware(yup.object({
  level: yup.string().required('El nivel de log es obligatorio'),
  message:yup.string().required('El mensaje de log es obligatiorio')
})),
(req,res) => {
  log(req.body.level, req.body.message);
  res.status(200).send({statusCode:200});
});
apiRouter.get('/status',
  (req, res) => {
    res.status(200).send({statusCode:200});
  });

app.use(validationErrorHandler);

app.listen(7000, () => console.log('LOGGY listening on port 7000!'));