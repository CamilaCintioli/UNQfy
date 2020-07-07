const express = require('express');
const bodyParser = require('body-parser');
const { activate, deactivate, log } = require('./services/loggyService');

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
apiRouter.post('/log',
  (req,res,next) => {
    log(req.body.level, req.body.message);
    res.status(200).send({statusCode:200});
  });

app.listen(7000, () => console.log('LOGGY listening on port 7000!'));