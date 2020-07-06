const {ARTIST_DOESNT_EXIST_ERROR, NOTIFY_ERROR} = require('../exceptions');

function errorHandlerMiddleware(err,req,res,next){
  const createResponse = errors[err.type];
  if(createResponse){
    createResponse(res);
  }
  else {
    next(err);
  }
}

function notifyError(err){
  return {
    type: err.name
  };
}

const errors = {
  [ARTIST_DOESNT_EXIST_ERROR]:createResourceDoesntExistResponseError,
  [NOTIFY_ERROR]:createInternalServerResponseError
};

function createResourceDoesntExistResponseError(res){
  res.status(404).send({status:404,errorCode:'RESOURCE_NOT_FOUND'});
}

function createInternalServerResponseError(res){
  res.status(500).send({status:500, errorCode: 'INTERNAL_SERVER_ERROR'});
}

module.exports = { errorHandlerMiddleware, notifyError } ;