const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',apiRouter);

apiRouter.post('/activate',
  (req,res,next) => {
    res.status(200).send('Activar!');
  });
apiRouter.post('/deactivate',
  (req,res,next) => {
    res.status(200).send('Desactivar!');
  });
apiRouter.post('/log',
  (req,res,next) => {
    res.status(200).send('Log!');
  });

app.listen(7000, () => console.log('LOGGY listening on port 7000!'));