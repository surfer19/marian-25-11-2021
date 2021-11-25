import { useState } from "react";

export function useSnackbar() {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState<string>();

  const openSnackBar = (msg = "Something went wrong...") => {
    setMessage(msg);
    setIsActive(true);
  };

  return { isActive, message, openSnackBar, showSnack: setIsActive };
}
