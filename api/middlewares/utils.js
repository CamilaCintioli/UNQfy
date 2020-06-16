const object = require('lodash/object');

function yupToError(yupError) {
  let errors = {};
  if (yupError.inner) {
    if (yupError.inner.length === 0) {
      return object.set(errors, yupError.path, yupError.message);
    }
    for (const err of yupError.inner) {
      if (!object.get(errors, err.path)) {
        errors = object.set(errors, err.path, err.message);
      }
    }
  }
  return errors;
}

module.exports=yupToError;