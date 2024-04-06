import { useAppSelector } from "src/hooks/useStore";

type ProgressBarProps = {
  questionsNumber: number;
};

export default function ProgressBar({ questionsNumber }: ProgressBarProps) {
  const { activeQuizScore } = useAppSelector((state) => state.stats);

  return (
    <>
      <div
        style={{
          gridTemplateColumns: `repeat(${questionsNumber}, 1fr)`,
          opacity: "0.7",
        }}
        className="mt-4 grid h-[14px] w-full overflow-hidden rounded-md"
      >
        {activeQuizScore
          ? activeQuizScore.map((score) => (
              <span
                key={score.questionId}
                className={`col-span-1 rounded-md border-[1px] border-solid border-white ${score.pass ? "bg-green-600" : "bg-red-600"}`}
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
      </div>
    </>
  );
}
