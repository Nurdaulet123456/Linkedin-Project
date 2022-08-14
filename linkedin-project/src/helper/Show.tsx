import { useState } from "react";

const Show = () => {
  const [passwordShown, setPasswordShown] = useState<boolean | null>(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return {
    passwordShown,
    togglePassword
  }
}

export {Show};
