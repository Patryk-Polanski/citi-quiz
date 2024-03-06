import QuizCard from "../features/quiz/QuizCard";
import { BlobGradients } from "../types/enums";
import { TEMP_DATA } from "../utils/constants";

export default function QuizzesPage() {
  return (
    <div className="relative">
      <span
        className={`absolute left-1/3 top-1/3 h-3/4 w-2/3 rounded-full bg-gradient-radial blur-lg ${BlobGradients.Green}`}
      />
      <span
        className={`absolute bottom-1/3 right-1/4 h-3/4 w-2/3 rounded-full bg-gradient-radial blur-lg ${BlobGradients.Green}`}
      />
      <ul className="mt-5 grid w-full grid-cols-2 items-center gap-5">
        {[TEMP_DATA.map((quiz) => <QuizCard key={quiz.quizId} quiz={quiz} />)]}
      </ul>
    </div>
  );
}
