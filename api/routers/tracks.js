const express = require('express');
const trackRouter = express.Router();
const {getLyrics} = require('../../model/services/tracksService');
const { unqfyError } = require('../middlewares/error');


trackRouter.route('/:id/lyrics')
  .get((req, res, next) => {
    const id = +req.params.id;
    getLyrics(res.locals.unqfy, id)
      .then((data) => res.status(200).send(data))
      .catch(error => next(unqfyError(error)));
  });

module.exports = trackRouter;

