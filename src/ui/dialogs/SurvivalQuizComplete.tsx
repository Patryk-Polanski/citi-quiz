import { motion as m } from "framer-motion";

import Icon from "src/ui/icons/Icon";
import Button from "src/ui/Button";
import { AnimDirection, BlobGradients, IconNames } from "src/types/enums";
import ProgressBar from "src/features/quiz/ProgressBar";
import { useMemo } from "react";
import { calcHighestScore } from "src/utils/dataManipulation";
import { QuizStats } from "src/types/stats";
import { slideAnim } from "src/utils/motion/shared/animations";
import { genericAnimProps } from "src/utils/motion/shared/animations";

type QuizCompleteProps = {
  questionsNumber: number | undefined;
  activeQuizScore: QuizStats[];
  survivalQuizHighestScore: number;
  onQuizRestart: () => void;
};

export default function SurvivalQuizComplete({
  onQuizRestart,
  questionsNumber,
  survivalQuizHighestScore,
  activeQuizScore,
}: QuizCompleteProps) {
  const activeQuizResults = useMemo(() => {
    return calcHighestScore(activeQuizScore || []);
  }, [activeQuizScore]);

  const activeQuizPercentage = useMemo(() => {
    return Math.floor((activeQuizResults / (questionsNumber || 0)) * 100);
  }, [activeQuizResults, questionsNumber]);

  return (
    <m.div
      className="container mt-8 flex w-full items-center justify-center"
      {...genericAnimProps}
      variants={slideAnim(AnimDirection.up)}
    >
      <div className="w-full">
        <div className="relative flex flex-col items-center gap-5 rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 px-6 pb-10 pt-9 text-center font-laila after:absolute after:inset-0 after:rounded-[20px] after:border-2 after:border-white/20">
          <span
            className={`pointer-events-none absolute right-16 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-gradient-radial ${BlobGradients.Fuchsia} opacity-60 blur-[20px]`}
          />
          <span
            className={`pointer-events-none absolute -bottom-1/3 left-16 h-80 w-80 -translate-y-1/2 rounded-full bg-gradient-radial ${BlobGradients.Fuchsia} opacity-60 blur-[20px]`}
          />
          <h2>Survival Quiz</h2>
          <h3 className="mt-2">Score:</h3>
          <div className="mt-2 flex w-full flex-col">
            <span className="text-2xl font-medium">
              {activeQuizResults}/{questionsNumber} - {activeQuizPercentage}%
            </span>
            <ProgressBar
              quizNumber={"survival"}
              questionsNumber={questionsNumber}
              staggerChildren
            />
          </div>
          <span className="mt-2 text-lg font-medium md:text-2xl">
            Highest score: {survivalQuizHighestScore}/{questionsNumber}
          </span>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Button el="link" href="/">
            <span>Back Home</span>
            <span className="w-[2px] grow self-stretch bg-white opacity-60" />
            <Icon iconName={IconNames.Home} className="h-5 w-5" />
          </Button>
          <Button el="button" onClick={onQuizRestart}>
            <span>Try again</span>
            <span className="w-[2px] grow self-stretch bg-white opacity-60" />
            <Icon iconName={IconNames.Restart} className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </m.div>
  );
}
