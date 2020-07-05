const {ARTIST_DOESNT_EXIST_ERROR} = require('../exceptions');

function errorHandlerMiddleware(err,req,res,next){
  const createResponse = errors[err.type];
  if(createResponse){
    createResponse(res);
  }
  else {
    next(err);
  }
}

const errors = {
  [ARTIST_DOESNT_EXIST_ERROR]:createResourceDoesntExistResponseError
};

function createResourceDoesntExistResponseError(res){
  res.status(404).send({status:404,errorCode:'RESOURCE_NOT_FOUND'});
}

module.exports = { errorHandlerMiddleware } ;