import { Link } from "react-router-dom";

import { IconNames } from "../../types/enums";

import Icon from "src/ui/icons/Icon";
import { Quiz } from "src/types/quiz";
import { QuizStats } from "src/types/stats";
import { useMemo } from "react";
import { calcHighestScore } from "src/utils/dataManipulation";

type QuizCardProps = {
  quiz: Quiz;
  quizStats: QuizStats[];
};

export default function QuizCard({ quiz, quizStats }: QuizCardProps) {
  const highestScore = useMemo(() => {
    return calcHighestScore(quizStats);
  }, [quizStats]);

  const highestScorePercentage = useMemo(() => {
    return Math.floor((highestScore / quizStats.length) * 100);
  }, [highestScore, quizStats.length]);

  return (
    <Link
      to={`/quiz/${quiz.quizNumber}`}
      className="group relative z-10 block w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 py-2 pl-4 drop-shadow-xl backdrop-blur transition duration-0 ease-in-out after:absolute after:inset-0 after:rounded-[20px] after:border-2 after:border-white/20 after:transition after:duration-0 hover:after:border-white/60"
    >
      <div className="flex items-center justify-between">
        <h3>Test {quiz.quizNumber}</h3>
        <div className="mx-auto flex flex-col items-center text-sm">
          <p>Highest score</p>
          <span>
            {highestScore}/{quizStats.length}
          </span>
          <span>{highestScorePercentage}%</span>
        </div>
        <span className="my-2 w-[2px] self-stretch bg-white opacity-60" />
        <Icon iconName={IconNames.Chevron} className="mx-2 h-5" />
      </div>
    </Link>
  );
}
