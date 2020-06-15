const express = require('express');
const yup = require('yup');

const { addArtist, searchArtists, getArtistById, updateArtist, deleteArtist } = require('../model/services/artistsService');
const { createValidationMiddleware } = require('./validation');
const { unqfyError } = require('./error');

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
        res.status(201).send({ status: 201, code: 'CREATED', artist });      
      }
      catch(error){
        next(unqfyError(error));
      }
    }
  )
  .get((req, res) => {
    const artists = searchArtists(res.locals.unqfy, req.query.name);
    res.status(200).send({ status: 200, code: 'OK', artists });
  });

artistRouter.route('/:id')
  .get((req, res, next) => {
    const artistId = +req.params.id;
    try{
      const artist = getArtistById(res.locals.unqfy, artistId);
      res.status(200).send({ code: 200, stats: 'OK', artist });
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
      res.status(200).send({ code: 200, status: 'OK', artist });
    }
    catch(error){
      next(unqfyError(error));
    }
  })
  .delete((req, res, next) => {
    const artistId = +req.params.id;
    try{
      deleteArtist(res.locals.unqfy, artistId);
      res.status(204).send({ status: 204, code: 'NO CONTENT' });
    }
    catch(error){
      next(unqfyError(error));
    }
  });

module.exports = artistRouter;