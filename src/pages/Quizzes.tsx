import QuizCard from "../features/quiz/QuizCard";

const tempArr = new Array(24);
tempArr.fill(1);

export default function QuizzesPage() {
  return (
    <ul className="mt-5 grid w-full grid-cols-2 items-center gap-5">
      {[
        tempArr.map((quizCard, index) => (
          <QuizCard key={index} index={index + 1} />
        )),
      ]}
    </ul>
  );
}
