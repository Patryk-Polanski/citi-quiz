import { IconNames } from "src/types/enums";
import Icon from "src/ui/Icons/Icon";

import Countdown from "./Countdown";

type QuizHeaderProps = {
  quizId: string;
};

export default function QuizHeader({ quizId }: QuizHeaderProps) {
  return (
    <div className="flex items-end justify-between font-laila">
      <h3 className="mr-auto text-2xl">Quiz {quizId.replace("-", " ")}</h3>
      {quizId !== "try-again" && quizId !== "survival" ? (
        <Countdown />
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
