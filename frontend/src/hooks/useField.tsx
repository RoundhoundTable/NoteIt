import { useState } from "react";

export const useField = ({ type }: any) => {
  const [value, setValue] = useState<string>("");

  const onChange = (ev: any) => setValue(ev.target.value);

  return {
    type,
    value,
    onChange,
  };
};
