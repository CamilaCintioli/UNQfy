const express = require('express');
const playlistRouter = express.Router();
const { createPlaylist } = require('../model/services/playlistsService');
const { searchPlaylists, deletePlaylist,  getPlaylistById } = require('../model/services/playlistsService');


playlistRouter.route('/')
  .post((req,res) => {
    const playlistData = {title:req.body.title, duration:req.body.duration, genres:req.body.genres, 
      tracks:req.body.tracks};
    const playlist = createPlaylist(res.locals.unqfy,playlistData);
    res.status(201).send({status:201,code:'CREATED',playlist});
  })
  
  .get((req,res) => {
    const playlists = searchPlaylists(res.locals.unqfy,req.query.title, req.query.durationLT, 
      req.query.durationGT);
    res.status(200).send({status:200,code:'OK',playlists});
  });


playlistRouter.route('/:id')
  .delete((req,res) => {
    const playlistId = +req.params.id;
    deletePlaylist(res.locals.unqfy,playlistId)
    res.status(204).send({status:204,code:'NO CONTENT'});
  })
  .get((req,res) => {
    const playlistId = +req.params.id;
    const playlist = getPlaylistById(res.locals.unqfy,playlistId);
    res.status(200).send({status:200, code:'OK', playlist});
  });


module.exports = playlistRouter;