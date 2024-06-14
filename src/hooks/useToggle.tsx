import { useState } from "react";

export function useToggle(
  defaultValue: boolean = false
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(defaultValue);
  const handleToggle = () => setValue((prev) => !prev);
  const handleFalse = () => setValue(false);
  const handleTrue = () => setValue(true);

  return [value, handleToggle, handleFalse, handleTrue];
}
