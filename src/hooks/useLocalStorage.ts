import { useEffect, useState } from "react";
import type { DefaultValueTypes } from "src/types/stats";
import { useAppSelector } from "src/hooks/useStore";

const useLocalStorage = (
  key: string,
  defaultValue?: DefaultValueTypes | object,
): [
  DefaultValueTypes,
  React.Dispatch<React.SetStateAction<DefaultValueTypes>>,
] => {
  const { user } = useAppSelector((store) => store.auth);
  const [value, setValue] = useState(() => {
    if (user) return {};
    try {
      const savedVal = localStorage.getItem(key);
      if (savedVal !== null) {
        return JSON.parse(savedVal) as DefaultValueTypes;
      }
      if (defaultValue) {
        return defaultValue;
      } else return {};
    } catch {
      if (defaultValue) return defaultValue;
      else return {};
    }
  });

  useEffect(() => {
    if (user) return;
    try {
      const rawValue = JSON.stringify(value);
      if (rawValue) {
        localStorage.setItem(key, rawValue);
      } else {
        localStorage.removeItem(key);
      }
    } catch {
      return;
    }
  }, [value, key, user]);

  return [value, setValue];
};

export default useLocalStorage;
