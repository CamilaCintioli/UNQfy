const express = require('express');
const yup = require('yup');

const { addArtist, searchArtists, getArtistById, updateArtist, deleteArtist } = require('../../model/services/artistsService');
const { createValidationMiddleware } = require('../middlewares/validation');
const { unqfyError } = require('../middlewares/error');

const artistRouter = express.Router();


artistRouter.route('/')
  .post(
    createValidationMiddleware(yup.object({
      name: yup.string().trim().required('El nombre es requerido'),
      country: yup.string().trim().required('El pais es requerido'),
    })),
    (req, res, next) => {
      try{
        const artistData = { name: req.body.name, country: req.body.country };
        const artist = addArtist(res.locals.unqfy, artistData);
        res.status(201).send( artist );      
      }
      catch(error){
        next(unqfyError(error));
      }
    }
  )
  .get((req, res) => {
    const artists = searchArtists(res.locals.unqfy, req.query.name);
    res.status(200).send(artists);
  });

artistRouter.route('/:id')
  .get((req, res, next) => {
    const artistId = +req.params.id;
    try{
      const artist = getArtistById(res.locals.unqfy, artistId);
      res.status(200).send(artist);
    }
    catch(error){
      next(unqfyError(error));
    }
  })
  .put(createValidationMiddleware(yup.object({
    name: yup.string().trim().required('El nombre es requerido'),
    country: yup.string().trim().required('El pais es requerido'),
  })),
  (req, res, next) => {
    const artistId = +req.params.id;
    const artistData = {
      name: req.body.name,
      country: req.body.country,
    };
    try{
      const artist = updateArtist(res.locals.unqfy, artistId, artistData);
      res.status(200).send(artist);
    }
    catch(error){
      next(unqfyError(error));
    }
  })
  .delete((req, res, next) => {
    const artistId = +req.params.id;
    try{
      deleteArtist(res.locals.unqfy, artistId);
      res.status(204).send();
    }
    catch(error){
      next(unqfyError(error));
    }
  });

module.exports = artistRouter;