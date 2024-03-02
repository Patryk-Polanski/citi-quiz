import { IconNames } from "../../types/enums";
import Icon from "../../ui/icons/_Icon";

import Countdown from "./Countdown";

type QuizHeaderProps = {
  quizId: string;
};

export default function QuizHeader({ quizId }: QuizHeaderProps) {
  return (
    <div className="flex items-end justify-between font-laila">
      <h3 className="mr-auto text-2xl">Quiz {quizId}</h3>
      <Icon
        iconName={IconNames.Timer}
        className="h-8 w-8 rotate-12 opacity-70"
      />
      <Countdown />
    </div>
  );
}
