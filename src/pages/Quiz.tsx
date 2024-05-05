import { useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  resetActiveQuiz,
  setActiveQuiz,
  updateActiveQuizScore,
  updateQuizzesStats,
  updateTryAgainQuestionIds,
  resetTryAgainQuestionIds,
  updateSurvivalQuizHighestScore,
} from "src/store/stats-slice";
import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import { BlobGradients, IconNames } from "src/types/enums";
import { type QuestionResult, type Question, Quiz } from "src/types/quiz";
import { TEMP_DATA } from "src/utils/constants";
import { createTryAgainQuiz, createSurvivalQuiz } from "src/utils/helpers";

import Button from "src/ui/Button";
import Icon from "src/ui/Icons/Icon";
import ProgressBar from "src/features/quiz/ProgressBar";
import QuizHeader from "src/features/quiz/QuizHeader";
import AnswerCard from "src/features/quiz/AnswerCard";
import QuizComplete from "src/ui/dialogs/QuizComplete";

export default function QuizPage() {
  const { quizId } = useParams();
  const {
    activeQuizId,
    activeQuizScore,
    tryAgainQuestionIds,
    survivalQuizHighestScore,
  } = useAppSelector((store) => store.stats);
  const dispatch = useAppDispatch();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [terminateQuizEarly, setTerminateQuizEarly] = useState(false);
  const [chosenLetter, setChosenLetter] = useState<string | null>(null);
  const [tempTryAgainQuestionIds, setTempTryAgainQuestionIds] = useState<
    string[]
  >([]);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [isQuizCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

  const activeQuiz = useMemo(() => {
    if (!activeQuizId) return null;

    if (quizId === "try-again") {
      return createTryAgainQuiz(TEMP_DATA, tryAgainQuestionIds);
    }

    if (quizId === "survival") {
      return createSurvivalQuiz(TEMP_DATA);
    }

    return TEMP_DATA.find((quiz) => quiz.quizId === activeQuizId) as
      | Quiz
      | undefined;
  }, [activeQuizId, quizId, tryAgainQuestionIds]);

  const activeQuestion = useMemo(() => {
    if (!activeQuiz) return;
    return activeQuiz.questions[questionIndex] as Question | null;
  }, [activeQuiz, questionIndex]);

  const questionResult: QuestionResult = useMemo(() => {
    if (buttonRef.current)
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    if (chosenLetter === null) return "unselected";

    if (chosenLetter === activeQuestion?.answer) {
      return "correct";
    } else if (chosenLetter !== activeQuestion?.answer) {
      return "wrong";
    }
    return "unselected";
  }, [chosenLetter, activeQuestion?.answer]);

  const handleRestartQuiz = () => {
    if (quizId) {
      dispatch(resetActiveQuiz());
      dispatch(setActiveQuiz(quizId));
      setQuestionIndex(0);
      setChosenLetter(null);
      setIsCompleteDialogOpen(false);
    }
  };

  useEffect(() => {
    dispatch(setActiveQuiz(quizId || null));
    return () => {
      dispatch(resetActiveQuiz());
    };
  }, [dispatch, quizId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionIndex]);

  useEffect(() => {
    if (!activeQuestion?.questionId) return;

    if (questionResult === "correct") {
      dispatch(
        updateActiveQuizScore({
          questionId: activeQuestion.questionId,
          pass: true,
        }),
      );
    } else if (questionResult === "wrong") {
      setTempTryAgainQuestionIds((prevState) => [
        ...prevState,
        activeQuestion.questionId,
      ]);

      if (quizId === "survival") {
        setTerminateQuizEarly(true);
        return;
      }

      dispatch(
        updateActiveQuizScore({
          questionId: activeQuestion.questionId,
          pass: false,
        }),
      );
    }
  }, [
    questionResult,
    activeQuestion?.questionId,
    dispatch,
    activeQuiz,
    quizId,
  ]);

  const handleNextQuestion = () => {
    // end the quiz
    if (
      questionIndex + 1 === activeQuiz?.questions.length ||
      terminateQuizEarly
    ) {
      if (quizId === "try-again") {
        dispatch(resetTryAgainQuestionIds());
      } else if (quizId === "survival") {
        if (activeQuizScore.length > survivalQuizHighestScore) {
          dispatch(updateSurvivalQuizHighestScore(activeQuizScore.length));
        }
      } else {
        dispatch(updateQuizzesStats(activeQuizScore));
      }
      dispatch(updateTryAgainQuestionIds(tempTryAgainQuestionIds));
      setIsCompleteDialogOpen(true);
      // navigate("/");
      return;
    }
    // move onto next question
    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    setChosenLetter(null);
  };

  if (isQuizCompleteDialogOpen) {
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
          quizId={activeQuiz.quizId}
        />
        <ProgressBar
          quizId={activeQuiz.quizId}
          questionsNumber={activeQuiz.questions.length}
        />
        <div className="mt-8 text-center font-laila">
          <h4 className="text-2xl">Question {questionIndex + 1}</h4>
          <h4 className="mt-4 text-2xl">{activeQuestion.question}</h4>
        </div>
        <div className="relative">
          <span
            className={`absolute left-1/4 top-1/2 h-[120%] w-2/3 -translate-y-1/2 rounded-full bg-gradient-radial ${BlobGradients.Fuchsia} opacity-80 blur-lg`}
          />
          <ul className="mt-8 flex flex-col gap-4 font-laila text-xl">
            {activeQuestion.options.map((option) => (
              <li key={option.letter}>
                <AnswerCard
                  option={option}
                  chosenLetter={chosenLetter}
                  correctLetter={activeQuestion.answer}
                  questionResult={questionResult}
                  onOptionSelect={setChosenLetter}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* chosen letter needs to exist for next/finish buttons to appear */}
        <div ref={buttonRef}>
          {chosenLetter !== null ? (
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
      {quizId === "try-again" ? (
        <p>You haven't failed any questions yet!</p>
      ) : (
        <p>Could not find a quiz with an id of {quizId}</p>
      )}
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
