import { FirebaseError } from "firebase/app";
import Joi from "joi";
import { firebaseErrors } from "./errorMessages";

export const formatError = (error: Error) => {
  let formattedError;

  if (error instanceof FirebaseError) {
    formattedError = firebaseErrors[error.code];
  }
  if (error instanceof Joi.ValidationError) {
    const errors = error.details.map((err) => {
      return {
        message: err.message,
        field: err.context.key,
      };
    });

    formattedError = errors;
  }

  return formattedError;
};
