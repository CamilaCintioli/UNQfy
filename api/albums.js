const express = require('express');
const albumRouter = express.Router();
const {addAlbum,searchAlbums,getAlbumById,updateAlbum,deleteAlbum} = require('../model/services/albumsService');

albumRouter.route('/')
  .post((req,res) => {
    const albumData = {title:req.body.title,year:req.body.year};
    const album = addAlbum(res.locals.unqfy,+req.body.artistId,albumData);
    res.status(201).send({status:201,code:'CREATED',album});
  })
  .get((req,res) => {
    const albums = searchAlbums(res.locals.unqfy,req.query.name);
    res.status(200).send({status:200,code:'OK',albums});
  });

albumRouter.route('/:id')
  .get((req,res) => {
    const albumId = +req.params.id;
    const album = getAlbumById(res.locals.unqfy,albumId);
    res.status(200).send({code:200,stats:'OK',album});
  })
  .put((req,res) => {
    const albumId = +req.params.id;
    const albumData = {
      title:req.body.title,
      year: req.body.year,
    };
    const album = updateAlbum(res.locals.unqfy,albumId,albumData);
    res.status(200).send({code:200,status:'OK',album});
  })
  .delete((req,res) => {
    const albumId = +req.params.id;
    deleteAlbum(res.locals.unqfy,albumId);
    res.status(204).send({status:204,code:'NO CONTENT'});
  });

module.exports = albumRouter;