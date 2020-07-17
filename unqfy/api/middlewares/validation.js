const VALIDATION_ERROR = 'VALIDATION_ERROR';
const yupToError = require('./utils');

function createValidationMiddleware(schema) {
  return (req, res, next) => {
    schema.validate(req.body)
      .then(() => next())
      .catch((err) => next(validationError(err)));
  };
}

function validationErrorHandler(err, req, res, next) {
  if (err.type === VALIDATION_ERROR) {
    const fields = yupToError(err.errors);
    res.status(400).send({status:400,errorCode:'BAD_REQUEST',fields});
  }
  else {
    next(err);
  }
}

function validationError(errors) {
  return {
    type: VALIDATION_ERROR,
    errors,
  };
}

module.exports ={createValidationMiddleware,validationErrorHandler};
