const express = require('express');
const yup = require('yup');
const albumRouter = express.Router();
const { addAlbum, searchAlbums, getAlbumById, updateAlbum, deleteAlbum } = require('../model/services/albumsService');
const { createValidationMiddleware } = require('./validation');
const { unqfyError } = require('./error');

albumRouter.route('/')
  .post(createValidationMiddleware(yup.object({
    artistId: yup.number().strict(true).required('El id del artista es requerido'),
    title: yup.string().trim().required('El titulo del album es requerido'),
    year: yup.number().strict(true).required('El año del album es requerido'),
  })),
  (req, res, next) => {
    try {
      const albumData = { title: req.body.title, year: req.body.year };
      const album = addAlbum(res.locals.unqfy, req.body.artistId, albumData);
      res.status(201).send(album);
    }
    catch (error) {
      next(unqfyError(error));
    }
  })
  .get((req, res) => {
    const albums = searchAlbums(res.locals.unqfy, req.query.title);
    res.status(200).send(albums);
  });

albumRouter.route('/:id')
  .get((req, res, next) => {
    try {
      const albumId = +req.params.id;
      const album = getAlbumById(res.locals.unqfy, albumId);
      res.status(200).send(album);
    }
    catch (error) {
      next(unqfyError(error));
    }
  })
  .put(createValidationMiddleware(yup.object({
    title: yup.string().trim(true),
    year: yup.number().strict(true),
  })),
  (req, res, next) => {
    try{
      const albumId = +req.params.id;
      const albumData = {
        title: req.body.title,
        year: req.body.year,
      };
      const album = updateAlbum(res.locals.unqfy, albumId, albumData);
      res.status(200).send(album);
    }
    catch(error){
      next(unqfyError(error));
    }
    
  })
  .delete((req, res, next) => {
    try{
      const albumId = +req.params.id;
      deleteAlbum(res.locals.unqfy, albumId);
      res.status(204).send();
    }
    catch(error){
      next(unqfyError(error));
    }
  });

module.exports = albumRouter;