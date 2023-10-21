import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: string) {
  const saved = localStorage.getItem(key);
  if (!saved) return defaultValue;
  return JSON.parse(saved);
}

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
