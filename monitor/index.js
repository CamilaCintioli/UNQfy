const express = require('express');
const bodyParser = require('body-parser');
const { getServicesStatus, activate, deactivate } = require('./monitorService');

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',apiRouter);

apiRouter.post('/activate', 
  (req, res, next)=>{
    activate();
    res.status(200).send({statusCode:200});
  });
apiRouter.post('/deactivate', 
  (req, res, next)=>{
    deactivate();
    res.status(200).send({statusCode:200});
  });
apiRouter.get('/status', 
  (req, res) => {
    getServicesStatus()
      .then((servicesStatus) => res.status(200).send({statusCode:200, servicesStatus}));
  });

app.listen(9000, () => {
  console.log('Monitor listening on port 9000!');
});



