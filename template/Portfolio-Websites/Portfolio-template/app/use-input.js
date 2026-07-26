import { useState, useEffect } from "react";

const useInputValidation = (initialValue, validationFn) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validationFn(value);

  useEffect(() => {
    if (isTouched && !isValid) {
      setIsTouched(false);
    }
  }, [isValid, isTouched]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setIsTouched(true);
  };

  const handleInputBlur = () => {
    setIsTouched(true);
  };

  return {
    value,
    isValid,
    isTouched,
    handleInputChange,
    handleInputBlur,
  };
};

export default useInputValidation;
