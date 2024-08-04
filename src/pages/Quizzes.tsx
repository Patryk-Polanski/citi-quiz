import { motion as m } from "framer-motion";

import QuizCard from "src/features/quiz/QuizCard";
import { BlobGradients } from "src/types/enums";

import useQuizzes from "src/hooks/useQuizzes";
import { useAppSelector } from "src/hooks/useStore";
import { blobAnim, genericAnimProps } from "src/utils/motion/shared/animations";
import {
  genericCardAnim,
  genericCardsAnim,
} from "src/utils/motion/cards/animations";

export default function QuizzesPage() {
  const { data: quizzesData } = useQuizzes();
  const { quizzes: quizzesStats } = useAppSelector((store) => store.stats);

  if (quizzesStats.length < 1) return null;

  return (
    <div className="relative">
      <m.span
        className={`absolute left-1/3 top-1/3 h-3/4 w-2/3 rounded-full bg-gradient-radial blur-lg ${BlobGradients.Green}`}
        {...genericAnimProps}
        variants={blobAnim}
      />
      <m.span
        className={`absolute bottom-1/3 right-1/4 h-3/4 w-2/3 rounded-full bg-gradient-radial blur-lg ${BlobGradients.Green}`}
        {...genericAnimProps}
        variants={blobAnim}
      />
      <m.ul
        className="mt-5 grid w-full grid-cols-1 items-center gap-3 md:grid-cols-2 md:gap-5"
        {...genericAnimProps}
        variants={genericCardsAnim}
      >
        {[
          quizzesData.map((quiz) => {
            const quizStats = quizzesStats[Number(quiz.quizNumber) - 1];
            return (
              <m.div variants={genericCardAnim}>
                <QuizCard key={quiz.quizId} quiz={quiz} quizStats={quizStats} />
              </m.div>
            );
          }),
        ]}
      </m.ul>
    </div>
  );
}
