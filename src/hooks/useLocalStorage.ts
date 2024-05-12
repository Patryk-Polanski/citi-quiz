import { useEffect, useState } from "react";
import { UserStats } from "src/types/stats";

type DefaultValueTypes = () => Omit<
  UserStats,
  "activeQuizId" | "activeQuizScore"
> | null;

const useLocalStorage = (key: string, defaultValue?: DefaultValueTypes) => {
  const [value, setValue] = useState(() => {
    try {
      const savedVal = localStorage.getItem(key);
      if (savedVal !== null) {
        return JSON.parse(savedVal);
      }
      if (defaultValue) {
        return defaultValue();
      }
    } catch {
      if (defaultValue) {
        return defaultValue();
      }
    }
  });

  useEffect(() => {
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
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
