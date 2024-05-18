import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import useLocalStorage from "src/hooks/useLocalStorage";
import { useAppSelector } from "src/hooks/useStore";

export default function QuizWrapper() {
  const stats = useAppSelector((store) => store.stats);
  const [_statsLocalStorage, setStatsLocalStorage] =
    useLocalStorage("citiquiz");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setStatsLocalStorage({
      quizzes: stats.quizzes,
      tryAgainQuestionIds: stats.tryAgainQuestionIds,
      survivalQuizHighestScore: stats.survivalQuizHighestScore,
    });
  }, [
    stats.quizzes,
    stats.tryAgainQuestionIds,
    stats.survivalQuizHighestScore,
    setStatsLocalStorage,
  ]);

  return <Outlet />;
}
