import { ApolloError } from "@apollo/client";
import { useState } from "react";
import { formatError } from "../utils/formatError";

export const useForm = <T>(initialValue?: T) => {
  const [form, setForm] = useState<T>(initialValue as T);
  const [errors, setErrors] = useState<T>();

  const onError = (error: ApolloError) => {
    setErrors({ ...errors, ...formatError(error) } as T);
  };

  const onChange = (ev: any) =>
    setForm({
      ...form,
      [ev.target.name]: ev.target.value,
    } as T);

  const resetErrors = () => {
    setErrors(undefined);
  };

  const updateForm = (newForm: T) => setForm({ ...form, ...newForm });

  const resetForm = () => setForm(initialValue as T);

  return {
    form,
    resetForm,
    updateForm,
    onChange,
    errors,
    resetErrors,
    onError,
  };
};
