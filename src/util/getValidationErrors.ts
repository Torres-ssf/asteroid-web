import { ValidationError } from 'yup';

export interface ValidationErrors {
  [key: string]: string;
}

const getValidationErrors = (err: ValidationError): ValidationErrors => {
  const validationErrors: ValidationErrors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
};

export default getValidationErrors;
