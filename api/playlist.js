const express = require('express');
const playlistRouter = express.Router();
const {} = require('../model/services/playlistService');
const { deletePlaylist } = require('../model/services/playListsService');


playlistRouter.route('/')
  .post((req,res) => {
    const playlistData = {name:req.body.name,maxDuration:req.body.maxDuration,genres:req.body.genres};
    const playlist = createPlaylist(res.locals.unqfy,playlistData);
    res.status(201).send({status:201,code:'CREATED',playlist});
  })
  .post((req,res) => {
      const playlistData = {name:req.body.name,idsOfTracks:req.body.idsOfTracks};
      const playlist = createPlaylistWithIdsTracks(res.locals.unqfy,playlistData);
      res.status(201).send({status:201,code:'CREATED',playlist});
  })
  .get((req,res) => {
    const playlists = searchArtists(res.locals.unqfy,req.query.name);
    res.status(200).send({status:200,code:'OK',artists});
  });

playlistRouter.route('/:id')
  .delete((req,res) => {
    const playlistId = +req.params.id;
    deletePlaylist(res.locals.unqfy,playlistId)
    res.status(204).send({status:204,code:'NO CONTENT'});
  });

module.exports = playlistRouter;