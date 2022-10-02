import { ApolloError } from "@apollo/client";
import { ValidationError, Schema } from "joi";
import { useState } from "react";
import { formatError } from "../utils/formatError";

export const useForm = <T>({
  initialValue,
  validationSchema,
}: {
  initialValue?: T;
  validationSchema?: Schema;
}) => {
  const [form, setForm] = useState<T>(initialValue as T);
  const [errors, setErrors] = useState<T | null>();

  const onError = (error: ApolloError) => {
    setErrors({ ...errors, ...formatError(error) } as T);
  };

  const onChange = (ev: any) =>
    setForm({
      ...form,
      [ev.target.name]: ev.target.value,
    } as T);

  const resetErrors = () => {
    setErrors(null);
  };

  const updateForm = (newForm: T) => setForm({ ...form, ...newForm });

  const resetForm = () => setForm(initialValue as T);

  const submit = async ({
    ev,
    func,
  }: {
    ev?: any;
    func: (...args: any) => any;
  }) => {
    try {
      if (ev) ev.preventDefault();

      resetErrors();

      if (validationSchema)
        await validationSchema.validateAsync(form, { abortEarly: false });

      func();
    } catch (error) {
      if (error instanceof ValidationError) {
        let validationErrors = {};
        error.details.forEach((err) => {
          validationErrors = {
            ...validationErrors,
            [err.context?.key as string]: err.message,
          };
        });

        setErrors({ ...validationErrors } as T);
      }
    }
  };

  return {
    form,
    resetForm,
    updateForm,
    onChange,
    errors,
    resetErrors,
    onError,
    submit,
  };
};
