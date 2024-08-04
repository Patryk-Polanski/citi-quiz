import { IconNames } from "src/types/enums";
import Icon from "src/ui/icons/Icon";
import Countdown from "./Countdown";

type QuizHeaderProps = {
  quizNumber: string;
  tempTryAgainQuestionIds: string[];
};

export default function QuizHeader({
  quizNumber,
  tempTryAgainQuestionIds,
}: QuizHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <h3 className="mr-auto">Quiz {quizNumber}</h3>
      {quizNumber !== "try-again" && quizNumber !== "survival" ? (
        <Countdown tempTryAgainQuestionIds={tempTryAgainQuestionIds} />
      ) : (
        <span className="mr-2">no time limit</span>
      )}
      <Icon
        iconName={IconNames.Timer}
        className="h-8 w-8 rotate-12 opacity-70"
      />
    </div>
  );
}
