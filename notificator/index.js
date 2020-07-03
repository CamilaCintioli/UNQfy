const express = require('express');
const bodyParser = require('body-parser');
const {notificatorMiddleware } = require('../api/middlewares/notify');

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',notificatorMiddleware, apiRouter);

apiRouter.post('/subscribe', (req,res) => {
  const notificationService = res.locals.notificator;
  notificationService.subscribe(res.req.body.artistId,req.body.email);
  res.status(200).send({statusCode:200});
});


app.listen(5000,() => console.log('Servicio de notificaciones escuchando en el puerto 5000'));
