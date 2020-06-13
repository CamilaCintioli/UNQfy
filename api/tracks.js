const express = require('express');
const trackRouter = express.Router();
const {getLyrics} = require('../model/services/tracksService');


trackRouter.route('/:id/lyrics')
    .get((req, res) => {
        const id = +req.params.id;
        getLyrics(res.locals.unqfy, id)
        .then((data) => res.status(200).send(data))
})

module.exports = trackRouter;
