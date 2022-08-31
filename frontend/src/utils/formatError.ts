import { ApolloError } from "@apollo/client";
import { NoteItError } from "../interfaces/Error";

export const formatError = (error: ApolloError) => {
  const _error: NoteItError[] = JSON.parse(error.message);

  let errors = {};
  if (Array.isArray(_error) && (_error as NoteItError[])) {
    _error.forEach((err) => {
      errors = {
        ...errors,
        [err.field]: err.message,
      };
    });
  }
  console.log(errors);
  return errors;
};
