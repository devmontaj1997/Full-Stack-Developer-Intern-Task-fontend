import { useState } from "react";

const FormHandleHooks = (initialState) => {
  const [input, setInput] = useState(initialState);

  const handleSetInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formReset = () => {
    setInput(initialState);
  };

  return { handleSetInput, input, formReset };
};

export default FormHandleHooks;
