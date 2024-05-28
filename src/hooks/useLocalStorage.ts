import { useEffect, useState } from "react";
import type { UserStats } from "src/types/stats";

export type DefaultValueTypes =
  | {
      stats: {
        quizzes: UserStats["quizzes"];
        tryAgainQuestionIds: UserStats["tryAgainQuestionIds"];
        survivalQuizHighestScore: UserStats["survivalQuizHighestScore"];
      };
      settings: {
        fontSize: string;
        background: string;
      };
    }
  | object;

const useLocalStorage = (
  key: string,
  defaultValue?: DefaultValueTypes | object,
): [
  DefaultValueTypes,
  React.Dispatch<React.SetStateAction<DefaultValueTypes>>,
] => {
  const [value, setValue] = useState(() => {
    try {
      const savedVal = localStorage.getItem(key);
      if (savedVal !== null) {
        return JSON.parse(savedVal) as DefaultValueTypes;
      }
      if (defaultValue) return defaultValue;
      else return {};
    } catch {
      if (defaultValue) return defaultValue;
      else return {};
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
