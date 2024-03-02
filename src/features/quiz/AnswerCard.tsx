import { type Option } from "../../types/quiz";

type AnswerCardProps = {
  option: Option;
};

export default function AnswerCard({ option }: AnswerCardProps) {
  return (
    <div
      className="group flex cursor-pointer items-center gap-2"
      data-option-letter={option.letter}
    >
      <div className="rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 px-6 py-4 drop-shadow-xl backdrop-blur transition duration-0 ease-in-out after:absolute after:inset-0 after:rounded-[20px] after:border-2 after:border-white/20 after:transition after:duration-0 group-hover:after:border-white/60">
        {option.letter}
      </div>
      <div className="w-full rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 px-6 py-4 drop-shadow-xl backdrop-blur transition duration-0 ease-in-out after:absolute after:inset-0 after:rounded-[20px] after:border-2 after:border-white/20 after:transition after:duration-0 group-hover:after:border-white/60">
        {option.answer}
      </div>
    </div>
  );
}
