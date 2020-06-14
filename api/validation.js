const VALIDATION_ERROR = 'VALIDATION_ERROR';

function createValidationMiddleware(schema) {
  return (req, res, next) => {
    schema.validate(req.body)
      .then(() => next())
      .catch((err) => next(validationError(err)));
  };
}

function validationErrorHandler(err, req, res, next) {
  if (err.type === VALIDATION_ERROR) {
    res.status(400).send(err.errors);
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
