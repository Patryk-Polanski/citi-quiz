import { useRef } from "react";

import { type Option } from "../../types/quiz";

type AnswerCardProps = {
  option: Option;
  onOptionSelect: (optionLetter: string | undefined) => void;
};

export default function AnswerCard({
  option,
  onOptionSelect,
}: AnswerCardProps) {
  const optionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={optionRef}
      onClick={() =>
        onOptionSelect(
          optionRef.current?.getAttribute("data-option-letter") || undefined,
        )
      }
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
