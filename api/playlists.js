const express = require('express');

const playlistRouter = express.Router();
const { createPlaylist } = require('../model/services/playlistsService');
const { getPlaylistById } = require('../model/services/playlistsService');
const { searchPlaylists, deletePlaylist } = require('../model/services/playlistsService');
const { createValidationMiddleware } = require('./validation');
const { playlistSchema } = require('../schemas');
const { unqfyError } = require('./error');

playlistRouter.route('/')
  .post(
    createValidationMiddleware(playlistSchema),
    (req, res, next) => {
      const playlistData = {
        title: req.body.title, duration: req.body.duration, genres: req.body.genres,
        tracks: req.body.tracks
      };

      try {
        const playlist = createPlaylist(res.locals.unqfy, playlistData);
        res.status(201).send({ status: 201, code: 'CREATED', playlist });
      }
      catch(error){
        next(unqfyError(error));
      }
    })

  .get((req, res) => {
    const playlists = searchPlaylists(res.locals.unqfy, req.query.title, req.query.durationLT,
      req.query.durationGT);
    res.status(200).send({ status: 200, code: 'OK', playlists });
  });


playlistRouter.route('/:id')
  .delete((req, res, next) => {
    try{
      const playlistId = +req.params.id;
      deletePlaylist(res.locals.unqfy, playlistId);
      res.status(204).send({ status: 204, code: 'NO CONTENT' });
    }
    catch(error) {
      next(unqfyError(error));
    }
  })
  .get((req, res, next) => {
    try{
      const playlistId = +req.params.id;
      const playlist = getPlaylistById(res.locals.unqfy, playlistId);
      res.status(200).send({ status: 200, code: 'OK', playlist });
    }
    catch(error){
      next(unqfyError(error));
    }

  });


module.exports = playlistRouter;