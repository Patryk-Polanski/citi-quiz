import { motion as m } from "framer-motion";

import { useAppSelector } from "src/hooks/useStore";

import {
  genericAnimProps,
  popAnim,
  popAnimWithOpacity,
  popAnimParent,
} from "src/utils/motion/shared/animations";

type ProgressBarProps = {
  questionsNumber: number | undefined;
  quizId: string | undefined;
  staggerChildren?: boolean;
};

export default function ProgressBar({
  questionsNumber,
  quizId,
  staggerChildren,
}: ProgressBarProps) {
  const { activeQuizScore } = useAppSelector((state) => state.stats);

  if (!questionsNumber || !quizId) return null;

  if (quizId === "survival") {
    return (
      <div className="mt-4 grid h-[14px] w-full overflow-hidden rounded-md opacity-70">
        <span
          style={{
            gridColumnStart: 1,
            gridColumnEnd: -1,
          }}
          className="relative rounded-md bg-white/30 text-black after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-3xl after:content-['∞']"
        />
      </div>
    );
  }

  return (
    <>
      <m.div
        style={{
          gridTemplateColumns: `repeat(${questionsNumber}, 1fr)`,
        }}
        className="mt-4 grid h-[14px] w-full overflow-hidden rounded-md opacity-70"
        {...(staggerChildren ? genericAnimProps : {})}
        variants={popAnimParent}
      >
        {activeQuizScore
          ? activeQuizScore.map((score) => (
              <m.span
                key={score.questionId}
                className={`col-span-1 rounded-md border-[1px] border-solid border-white ${score.pass ? "bg-green-600" : "bg-red-600"}`}
                {...(!staggerChildren ? genericAnimProps : {})}
                variants={!staggerChildren ? popAnim : popAnimWithOpacity}
              />
            ))
          : null}
        {activeQuizScore.length < questionsNumber ? (
          <span
            style={{
              gridColumnStart: activeQuizScore.length + 1,
              gridColumnEnd: questionsNumber + 1,
            }}
            className="rounded-md bg-white/30"
          />
        ) : null}
      </m.div>
    </>
  );
}
