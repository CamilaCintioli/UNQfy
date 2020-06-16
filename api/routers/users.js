const express = require('express');
const yup = require('yup');
const userRouter = express.Router();
const {
  addUser,
  getUserById,
  listenTrackByUser,
  getTracksListenByUser,
  deleteUser} = require('../../model/services/usersService');
const { createValidationMiddleware } = require('../middlewares/validation');
const { unqfyError } = require('../middlewares/error');

userRouter.route('/')
  .post(
    createValidationMiddleware(yup.object({
      name: yup.string().trim().required('El nombre es requerido'),
      lastname: yup.string().trim().required('El apellido es requerido')
    })),
    (req,res, next) => {
      try{
        const userData = {name:req.body.name, lastname:req.body.lastname};
        const user = addUser(res.locals.unqfy, userData);
        res.status(201).send(user);
      }
      catch(error){
        next(unqfyError(error));
      }
     
    })
  .put(
    createValidationMiddleware(yup.object({
      userId: yup.number('Debe ser un numero').min(0,'El id del usuario debe ser positivo').integer('Debe ser un numero entero').required('El id del del usuario es obligatorio'),
      trackId: yup.number().min(0,'El id del usuario debe ser positivo').integer('Debe ser un numero entero').required('El id del del track es obligatorio')
    })),
    (req,res,next) => {
      try{
        const userId =  req.body.userId;
        const trackId  = req.body.trackId; 
        const user = listenTrackByUser(res.locals.unqfy,userId,trackId);
        res.status(200).send(user);
      }
      catch(error){
        next(unqfyError(error));
      }
    })
  .get((req,res,next) =>{
    try{
      const userId = req.body.userId;
      const tracks = getTracksListenByUser(res.locals.unqfy, userId);
      res.status(200).send(tracks);
    }
    catch(error){
      next(unqfyError(error));
    }

  });
  
userRouter.route('/:id/tracks')
  .get((req,res, next) => {
    try{
      const userId = +req.params.id;
      const tracks = getTracksListenByUser(res.locals.unqfy,userId);
      res.status(200).send(tracks);
    }
    catch(error){
      next(unqfyError(error));
    }
  });

userRouter.route('/:id')
  .get((req,res,next) => {
    try{
      const userId =  +req.params.id;
      const user = getUserById(res.locals.unqfy,userId);
      res.status(200).send(user);
    }
    catch(error){
      next(unqfyError(error));
    }
  })
  .delete((req,res, next) => {
    try{
      const userId = +req.params.id;
      deleteUser(res.locals.unqfy, userId);
      res.status(204).send();
    }
    catch(error){
      next(unqfyError(error));
    }
  });

  
  
 
module.exports = userRouter;