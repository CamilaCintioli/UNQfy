const express = require('express');
const userRouter = express.Router();
const {addUser,getUserById,listenTrackByUser, getTracksListenByUser, 
  getTimesHeardATrack, deleteUser} = require('../model/services/usersService');

userRouter.route('/')
  .post((req,res) => {
    const userData = {name:req.body.name, lastname:req.body.lastname};
    const user = addUser(res.locals.unqfy, userData);
    res.status(201).send({status:201,code:'CREATED',user});
  })
  .put((req,res) => {
    const userId =  req.body.userId;
    const trackId  = req.body.trackId; 
    const user = listenTrackByUser(res.locals.unqfy,userId,trackId);
    res.status(200).send({code:200,status:'OK',user});
  })
  .get((req,res) =>{
    const userId = req.body.userId;
    const tracks = getTracksListenByUser(res.locals.unqfy, userId);
    res.status(200).send({code:200,status:'OK',tracks});
  })
  
userRouter.route('/:id')
  .get((req,res) => {
    const userId =  +req.params.id;
    const user = getUserById(res.locals.unqfy,userId);
    res.status(200).send({status:200,code:'OK',user});
  })
  .delete((req,res) => {
    const userId = +req.params.id;
    deleteUser(res.locals.unqfy, userId);
    res.status(204);
  })

userRouter.route('/:userId/:trackId')
  .get((req,res) => {
    const userId = req.body.userId;
    const trackId = req.body.trackId;
    const times = getTimesHeardATrack(res.locals.unqfy, userId, trackId);
    res.status(200).send({code:200,status:'OK',times});
  })
  
  
 
module.exports = userRouter