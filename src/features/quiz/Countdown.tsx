import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import {
  resetActiveQuiz,
  updateQuizzesStats,
  updateTryAgainQuestionIds,
} from "src/store/stats-slice";
import { useNavigate } from "react-router-dom";

type CountdownProps = {
  tempTryAgainQuestionIds: string[];
};

export default function Countdown({ tempTryAgainQuestionIds }: CountdownProps) {
  const [time, setTime] = useState(2700); // 2700 is 45 minutes in seconds (-1 second)
  const [displayTime, setDisplayTime] = useState("45:00");
  const dispatch = useAppDispatch();
  const { activeQuizScore } = useAppSelector((store) => store.stats);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);

      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      setDisplayTime(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );
    }, 1000);

    if (time < 0) {
      clearInterval(interval);

      dispatch(updateQuizzesStats(activeQuizScore));
      dispatch(updateTryAgainQuestionIds(tempTryAgainQuestionIds));
      dispatch(resetActiveQuiz());
      alert("time run out");
      navigate("/");
    }

    return () => clearInterval(interval);
  }, [time, activeQuizScore, tempTryAgainQuestionIds, dispatch, navigate]);

  return (
    <div>
      <span className="mr-2 text-lg md:text-xl">{displayTime}</span>
    </div>
  );
}
