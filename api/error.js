const {
  DUPLICATED_ARTIST_ERROR,
  DUPLICATED_ALBUM_ERROR,
  ARTIST_DOESNT_EXIST_ERROR,
  ALBUM_CANT_BE_CREATED_ERROR,
  ALBUM_DOESNT_EXIST_ERROR,
  TRACK_DOESNT_EXIST_ERROR,
  PLAYLIST_DOESNT_EXIST_ERROR,
  DUPLICATED_USER_ERROR,
  USER_DOESNT_EXIST_ERROR,
} = require('../exceptions');

function unqfyError(error){
  return {
    type: 'UNQFY_ERROR',
    error: {
      name : error.name,
      message: error.message,
      data: error.data,
    }
  };
}

function unqfyErrorHandler(err,req,res,next){
  
  if(err.type === 'UNQFY_ERROR'){
    const createResponse = errors[err.error.name];
    if(createResponse){
      createResponse(res,err.error.data);
    }
    else {
      next(err);
    }
  }
  else {
    next(err);
  }
}




function createDuplicatedArtistResponseError(res,artist){
  res.status(409).send({status:409,errorCode:'RESOURCE_ALREADY_EXISTS'});
}

function createDuplicatedAlbumResponseError(res,album){
  res.status(409).send({status:409,errorCode:'RESOURCE_ALREADY_EXISTS'});
}

function createResourceDoesntExistResponseError(res,id){
  res.status(404).send({status:404,errorCode:'RESOURCE_NOT_FOUND'});
}

function createRelatedResourceDoesntExistResponseError(res,id){
  res.status(404).send({status:404,errorCode:'RELATED_RESOURCE_NOT_FOUND'});
}

function createDuplicatedUserResponseError(res,user){
  res.status(409).send({status:409,errorCode:'RESOURCE_ALREADY_EXISTS'});
}

const errors = {
  [DUPLICATED_ARTIST_ERROR]: createDuplicatedArtistResponseError, 
  [ARTIST_DOESNT_EXIST_ERROR]: createResourceDoesntExistResponseError,
  [ALBUM_CANT_BE_CREATED_ERROR]: createRelatedResourceDoesntExistResponseError,
  [DUPLICATED_ALBUM_ERROR]: createDuplicatedAlbumResponseError,
  [ALBUM_DOESNT_EXIST_ERROR]:createResourceDoesntExistResponseError,
  [TRACK_DOESNT_EXIST_ERROR]:createResourceDoesntExistResponseError,
  [PLAYLIST_DOESNT_EXIST_ERROR]:createResourceDoesntExistResponseError,
  [DUPLICATED_USER_ERROR]:createDuplicatedUserResponseError,
  [USER_DOESNT_EXIST_ERROR]:createResourceDoesntExistResponseError
};

module.exports = {unqfyError,unqfyErrorHandler};
