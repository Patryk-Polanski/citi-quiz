import { IconNames } from "../../types/enums";
import Icon from "../../ui/icons/_Icon";

export default function QuizHeader() {
  return (
    <div className="flex items-end justify-between font-laila">
      <h3 className="mr-auto text-2xl">Quiz 11</h3>
      <Icon
        iconName={IconNames.Timer}
        className="h-8 w-8 rotate-12 opacity-70"
      />
      <span className="ml-2 text-xl">38:26</span>
    </div>
  );
}
