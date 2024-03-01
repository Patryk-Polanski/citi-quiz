import { Link } from "react-router-dom";

import { IconNames } from "../../types/enums";
import Icon from "../../ui/icons/_Icon";

export default function QuizCard({ index }: { index: number }) {
  return (
    <Link
      to="/quiz/1"
      className="group relative z-10 block w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 py-2 pl-4 drop-shadow-xl backdrop-blur transition duration-0 ease-in-out after:absolute after:inset-0 after:rounded-[20px] after:border-2 after:border-white/20 after:transition after:duration-0 hover:after:border-white/60"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-laila text-2xl">Test {index}</h3>
        <div className="mx-auto flex flex-col items-center text-sm">
          <p>Highest score</p>
          <span>18/24</span>
          <span>75%</span>
        </div>
        <span className="my-2 w-[2px] self-stretch bg-white opacity-60" />
        <Icon iconName={IconNames.Chevron} className="mx-2 h-5" />
      </div>
    </Link>
  );
}
