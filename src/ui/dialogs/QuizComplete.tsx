import Icon from "src/ui/Icons/Icon";
import Button from "src/ui/Button";
import { BlobGradients, IconNames } from "src/types/enums";
import Emoji from "src/ui/Emojis/Emoji";
import { useParams } from "react-router-dom";
import ProgressBar from "src/features/quiz/ProgressBar";
import { useAppSelector } from "src/hooks/useStore";
import { useMemo } from "react";
import { calcHighestScore, getResultsReactions } from "src/utils/helpers";
import { quizStats } from "src/types/stats";

type QuizCompleteProps = {
  questionsNumber: number | undefined;
  activeQuizScore: quizStats[];
  onQuizRestart: () => void;
};

export default function QuizComplete({
  onQuizRestart,
  questionsNumber,
  activeQuizScore,
}: QuizCompleteProps) {
  const { quizId } = useParams();
  const quizzes = useAppSelector((store) => store.stats.quizzes);

  const highestScore = useMemo(() => {
    if (!quizId) return null;
    const quizStats = quizzes[Number(quizId) - 1];
    return calcHighestScore(quizStats || []);
  }, [quizzes, quizId]);

  const activeQuizResults = useMemo(() => {
    return calcHighestScore(activeQuizScore || []);
  }, [activeQuizScore]);

  const activeQuizPercentage = useMemo(() => {
    return Math.floor((activeQuizResults / (questionsNumber || 0)) * 100);
  }, [activeQuizResults, questionsNumber]);

  const resultsReactions = useMemo(
    () => getResultsReactions(activeQuizPercentage),
    [activeQuizPercentage],
  );

  return (
    <div className="container mt-8 flex w-full items-center justify-center">
      <div className="w-full">
        <div className="relative flex flex-col items-center gap-5 rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 px-6 pb-10 pt-9 text-center font-laila after:absolute after:inset-0 after:rounded-[20px] after:border-2 after:border-white/20">
          <span
            className={`pointer-events-none absolute right-16 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-gradient-radial ${BlobGradients.Fuchsia} opacity-60 blur-[20px]`}
          />
          <span
            className={`pointer-events-none absolute -bottom-1/3 left-16 h-80 w-80 -translate-y-1/2 rounded-full bg-gradient-radial ${BlobGradients.Fuchsia} opacity-60 blur-[20px]`}
          />
          <h2 className="text-3xl">Quiz {quizId}</h2>
          <h3 className="mt-2 text-xl">Score:</h3>
          <div className="mt-2 flex w-full flex-col">
            <span className="text-2xl font-medium">
              {activeQuizResults}/{questionsNumber} - {activeQuizPercentage}%
            </span>
            <ProgressBar quizId={quizId} questionsNumber={questionsNumber} />
          </div>
          <div className="flex flex-col items-center gap-3">
            <Emoji emojiName={resultsReactions.emoji} className="mt-4 w-16" />
            <span className="text-lg">{resultsReactions.message}</span>
          </div>
          <span className="mt-2 text-2xl font-medium">
            Highest score: {highestScore}/{questionsNumber}
          </span>
        </div>
        <div className="mt-8 flex items-center justify-center gap-5">
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
    </div>
  );
}