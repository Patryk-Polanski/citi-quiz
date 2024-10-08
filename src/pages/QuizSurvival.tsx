import { useEffect, useMemo, useState, useRef } from "react";
import { motion as m } from "framer-motion";

import {
  resetActiveQuiz,
  setActiveQuiz,
  updateTryAgainQuestionIds,
  updateSurvivalQuizHighestScore,
} from "src/store/stats-slice";
import useQuizzes from "src/hooks/useQuizzes";
import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import { BlobGradients, IconNames } from "src/types/enums";
import { type QuestionResult, type Question } from "src/types/quiz";
import {
  calculateQuestionResult,
  createSurvivalQuiz,
  updateQuizWithQuestionResult,
} from "src/utils/dataManipulation";
import useUpdateUserStats from "src/hooks/useUpdateUserStats";

import Button from "src/ui/Button";
import Icon from "src/ui/icons/Icon";
import ProgressBar from "src/features/quiz/ProgressBar";
import QuizHeader from "src/features/quiz/QuizHeader";
import AnswerCard from "src/features/quiz/AnswerCard";
import SurvivalQuizComplete from "src/ui/dialogs/SurvivalQuizComplete";
import {
  genericCardAnim,
  genericCardsAnim,
} from "src/utils/motion/cards/animations";
import { blobAnim, genericAnimProps } from "src/utils/motion/shared/animations";

export default function SurvivalQuizPage() {
  const { data: quizzesData } = useQuizzes();
  const { user } = useAppSelector((store) => store.auth);
  const {
    activeQuizNumber,
    activeQuizScore,
    survivalQuizHighestScore,
    tryAgainQuestionIds,
  } = useAppSelector((store) => store.stats);
  const { updateUserStats } = useUpdateUserStats();
  const dispatch = useAppDispatch();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [terminateQuizEarly, setTerminateQuizEarly] = useState(false);
  const [chosenLetter, setChosenLetter] = useState<string[] | null>(null);
  const [tempTryAgainQuestionIds, setTempTryAgainQuestionIds] = useState<
    string[]
  >([]);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const activeQuiz = useMemo(() => {
    if (!activeQuizNumber) return null;
    return createSurvivalQuiz(quizzesData);
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
    dispatch(resetActiveQuiz());
    dispatch(setActiveQuiz("survival"));
    setQuestionIndex(0);
    setChosenLetter(null);
    setTerminateQuizEarly(false);
    setIsQuizComplete(false);
  };

  useEffect(() => {
    dispatch(setActiveQuiz("survival"));
    return () => {
      dispatch(resetActiveQuiz());
    };
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionIndex]);

  useEffect(() => {
    updateQuizWithQuestionResult(
      activeQuestion?.questionId,
      questionResult,
      dispatch,
      setTempTryAgainQuestionIds,
      setTerminateQuizEarly,
    );
  }, [questionResult, activeQuestion?.questionId, dispatch, activeQuiz]);

  const handleNextQuestion = () => {
    // end the quiz
    if (
      questionIndex + 1 === activeQuiz?.questions.length ||
      terminateQuizEarly
    ) {
      if (activeQuizScore.length > survivalQuizHighestScore) {
        dispatch(updateSurvivalQuizHighestScore(activeQuizScore.length - 1));
        if (user) {
          updateUserStats({
            dataToUpdate: {
              "stats.survivalQuizHighestScore": activeQuizScore.length - 1,
            },
          });
        }
      }
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
      <SurvivalQuizComplete
        onQuizRestart={handleRestartQuiz}
        questionsNumber={activeQuiz?.questions.length}
        activeQuizScore={activeQuizScore}
        survivalQuizHighestScore={survivalQuizHighestScore}
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
                  {questionIndex < activeQuiz.questions.length - 1 &&
                  !terminateQuizEarly
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
      <p>Something went wrong. Please try again later.</p>
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
