import { MutableRefObject } from "react";
import { useAppSelector } from "src/hooks/useStore";

type ProgressBarProps = {
  questionsNumber: number | MutableRefObject<number> | undefined;
  quizId: string | undefined;
};

export default function ProgressBar({
  questionsNumber,
  quizId,
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
      <div
        style={{
          gridTemplateColumns: `repeat(${questionsNumber}, 1fr)`,
        }}
        className="mt-4 grid h-[14px] w-full overflow-hidden rounded-md opacity-70"
      >
        {activeQuizScore
          ? activeQuizScore.map((score) => (
              <span
                key={score.questionId}
                className={`col-span-1 rounded-md border-[1px] border-solid border-white ${score.pass ? "bg-green-600" : "bg-red-600"}`}
              />
            ))
          : null}
        {activeQuizScore.length < (questionsNumber || questionsNumber) ? (
          <span
            style={{
              gridColumnStart: activeQuizScore.length + 1,
              gridColumnEnd: questionsNumber + 1,
            }}
            className="rounded-md bg-white/30"
          />
        ) : null}
      </div>
    </>
  );
}
