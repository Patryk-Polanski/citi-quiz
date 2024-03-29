import { useRef } from "react";

import { type QuestionResult, type Option } from "../../types/quiz";
import AnswerCardPopup from "./AnswerCardPopup";

type AnswerCardProps = {
  option: Option;
  chosenLetter: string | null;
  correctLetter: string;
  questionResult: QuestionResult;
  onOptionSelect: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function AnswerCard({
  option,
  chosenLetter,
  correctLetter,
  questionResult,
  onOptionSelect,
}: AnswerCardProps) {
  const optionRef = useRef<HTMLDivElement | null>(null);

  let borderClasses = "after:border-white/20 group-hover:after:border-white/60";
  let answerPopup: React.ReactNode;

  if (
    questionResult === "correct" &&
    chosenLetter === optionRef.current?.getAttribute("data-option-letter")
  ) {
    borderClasses = "after:border-green-600 text-green-600";
    answerPopup = <AnswerCardPopup passed={true} />;
  } else if (
    questionResult === "wrong" &&
    chosenLetter === optionRef.current?.getAttribute("data-option-letter")
  ) {
    borderClasses = "after:border-red-600 text-red-600";
    answerPopup = <AnswerCardPopup passed={false} />;
  } else if (
    questionResult === "wrong" &&
    correctLetter === optionRef.current?.getAttribute("data-option-letter")
  ) {
    borderClasses = "after:border-green-600 text-green-600";
  }

  return (
    <div
      ref={optionRef}
      onClick={() =>
        onOptionSelect(
          optionRef.current?.getAttribute("data-option-letter") || "-1",
        )
      }
      className="group relative flex cursor-pointer items-center gap-2"
      data-option-letter={option.letter}
    >
      {answerPopup}
      <div
        className={`rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 px-6 py-4 drop-shadow-xl backdrop-blur transition duration-0 ease-in-out after:absolute after:inset-0 after:rounded-[20px] after:border-2  after:transition after:duration-0 ${borderClasses}`}
      >
        {option.letter}
      </div>
      <div
        className={`w-full rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 px-6 py-4 drop-shadow-xl backdrop-blur transition duration-0 ease-in-out after:absolute after:inset-0 after:rounded-[20px] after:border-2  after:transition after:duration-0 ${borderClasses}`}
      >
        {option.answer}
      </div>
    </div>
  );
}
