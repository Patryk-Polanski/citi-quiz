import { useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion as m } from "framer-motion";

import {
  resetActiveQuiz,
  setActiveQuiz,
  updateQuizzesStats,
  updateTryAgainQuestionIds,
} from "src/store/stats-slice";
import useQuizzes from "src/hooks/useQuizzes";
import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import { BlobGradients, IconNames } from "src/types/enums";
import { type QuestionResult, type Question, Quiz } from "src/types/quiz";

import Button from "src/ui/Button";
import Icon from "src/ui/icons/Icon";
import ProgressBar from "src/features/quiz/ProgressBar";
import QuizHeader from "src/features/quiz/QuizHeader";
import AnswerCard from "src/features/quiz/AnswerCard";
import QuizComplete from "src/ui/dialogs/QuizComplete";
import {
  genericCardAnim,
  genericCardsAnim,
} from "src/utils/motion/cards/animations";
import { blobAnim, genericAnimProps } from "src/utils/motion/shared/animations";
import useUpdateUserStats from "src/hooks/useUpdateUserStats";
import {
  calculateQuestionResult,
  transformQuizzesArrToObj,
  updateQuizWithQuestionResult,
} from "src/utils/dataManipulation";

export default function QuizPage() {
  const { data: quizzesData } = useQuizzes();
  const { quizNumber } = useParams();
  const { user } = useAppSelector((store) => store.auth);
  const stats = useAppSelector((store) => store.stats);
  const { activeQuizNumber, activeQuizScore, tryAgainQuestionIds, quizzes } =
    stats;
  const { updateUserStats } = useUpdateUserStats();
  const dispatch = useAppDispatch();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chosenLetter, setChosenLetter] = useState<string[] | null>(null);
  const [tempTryAgainQuestionIds, setTempTryAgainQuestionIds] = useState<
    string[]
  >([]);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const activeQuiz = useMemo(() => {
    if (!activeQuizNumber) return null;

    return quizzesData.find((quiz) => quiz.quizNumber === activeQuizNumber) as
      | Quiz
      | undefined;
  }, [activeQuizNumber, quizzesData]);

  const activeQuestion = useMemo(() => {
    if (!activeQuiz) return;
    return activeQuiz.questions[questionIndex] as Question | null;
  }, [activeQuiz, questionIndex]);

  const questionResult: QuestionResult = useMemo(
    () =>
      calculateQuestionResult(
        buttonRef,
        activeQuestion?.correctAnswer,
        chosenLetter,
      ),
    [chosenLetter, activeQuestion?.correctAnswer],
  );

  const handleRestartQuiz = () => {
    if (quizNumber) {
      dispatch(resetActiveQuiz());
      dispatch(setActiveQuiz(Number(quizNumber)));
      setQuestionIndex(0);
      setChosenLetter(null);
      setIsQuizComplete(false);
    }
  };

  useEffect(() => {
    dispatch(setActiveQuiz(Number(quizNumber) || null));
    return () => {
      dispatch(resetActiveQuiz());
    };
  }, [dispatch, quizNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionIndex]);

  useEffect(() => {
    updateQuizWithQuestionResult(
      activeQuestion?.questionId,
      questionResult,
      dispatch,
      setTempTryAgainQuestionIds,
    );
  }, [questionResult, activeQuestion?.questionId, dispatch, activeQuiz]);

  useEffect(() => {
    if (user) {
      updateUserStats({
        dataToUpdate: {
          "stats.quizzes": transformQuizzesArrToObj(quizzes),
        },
      });
    }
  }, [quizzes, updateUserStats, user]);

  const handleNextQuestion = () => {
    // end the quiz
    if (
      questionIndex + 1 === activeQuiz?.questions.length &&
      activeQuizNumber
    ) {
      dispatch(updateQuizzesStats(activeQuizScore));
      dispatch(updateTryAgainQuestionIds(tempTryAgainQuestionIds));
      if (user) {
        const mergedTryAgainQuestionIds = [
          ...new Set([...tryAgainQuestionIds, ...tempTryAgainQuestionIds]),
        ];
        updateUserStats({
          dataToUpdate: {
            "stats.tryAgainQuestionIds": mergedTryAgainQuestionIds,
          },
        });
      }
      setIsQuizComplete(true);
      return;
    }
    // move onto next question
    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    setChosenLetter(null);
  };

  if (isQuizComplete) {
    return (
      <QuizComplete
        onQuizRestart={handleRestartQuiz}
        questionsNumber={activeQuiz?.questions.length}
        activeQuizScore={activeQuizScore}
      />
    );
  }

  if (activeQuiz && activeQuestion) {
    return (
      <>
        <QuizHeader
          tempTryAgainQuestionIds={tempTryAgainQuestionIds}
          quizNumber={activeQuiz.quizNumber}
        />
        <ProgressBar
          quizNumber={activeQuiz.quizNumber}
          questionsNumber={activeQuiz.questions.length}
        />
        <div className="mt-8 text-center">
          <h3>Question {questionIndex + 1}</h3>
          <h3 className="mt-4">{activeQuestion.question}</h3>
        </div>
        <div className="relative">
          <m.ul
            key={activeQuestion.questionId}
            className="mt-8 flex flex-col gap-4 font-laila text-lg md:text-xl"
            {...genericAnimProps}
            variants={genericCardsAnim}
          >
            <m.span
              className={`absolute left-1/4 top-1/2 h-[120%] w-2/3 -translate-y-1/2 rounded-full bg-gradient-radial ${BlobGradients.Fuchsia} opacity-80 blur-lg`}
              {...genericAnimProps}
              variants={blobAnim}
            />
            {activeQuestion.options.map((option) => (
              <m.li key={option.letter} variants={genericCardAnim}>
                <AnswerCard
                  option={option}
                  chosenLetter={chosenLetter}
                  correctLetter={activeQuestion.correctAnswer}
                  questionResult={questionResult}
                  onOptionSelect={setChosenLetter}
                />
              </m.li>
            ))}
          </m.ul>
        </div>
        {/* chosen letter needs to exist for next/finish buttons to appear */}
        <div ref={buttonRef}>
          {(chosenLetter !== null &&
            chosenLetter.length === activeQuestion.correctAnswer.length) ||
          questionResult === "wrong" ? (
            <div className="mt-6 flex flex-col items-center justify-center gap-6">
              <Button onClick={handleNextQuestion} el="button">
                <span>
                  {questionIndex < activeQuiz.questions.length - 1
                    ? "Next question"
                    : "Finish"}
                </span>
                <span className="w-[2px] self-stretch bg-white opacity-60" />
                <Icon iconName={IconNames.Chevron} className="h-5 w-5" />
              </Button>
              <p>{activeQuestion.explanation}</p>
            </div>
          ) : null}
        </div>
      </>
    );
  }

  // show error
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-8">
      <p>Could not find a quiz number {quizNumber}</p>
      <Button el="link" href="/">
        <Icon
          iconName={IconNames.Chevron}
          className="h-[18px] w-[18px] rotate-180"
        />
        <span className="w-[2px] self-stretch bg-white opacity-60" />
        <span>Back Home</span>
      </Button>
    </div>
  );
}
