import { useEffect, useMemo, useState, useRef } from "react";

import {
  resetActiveQuiz,
  setActiveQuiz,
  updateActiveQuizScore,
  updateTryAgainQuestionIds,
  updateSurvivalQuizHighestScore,
} from "src/store/stats-slice";
import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import { BlobGradients, IconNames } from "src/types/enums";
import { type QuestionResult, type Question } from "src/types/quiz";
import { TEMP_DATA } from "src/utils/constants";
import { createSurvivalQuiz, arraysAreEqual } from "src/utils/helpers";

import Button from "src/ui/Button";
import Icon from "src/ui/Icons/Icon";
import ProgressBar from "src/features/quiz/ProgressBar";
import QuizHeader from "src/features/quiz/QuizHeader";
import AnswerCard from "src/features/quiz/AnswerCard";
import SurvivalQuizComplete from "src/ui/dialogs/SurvivalQuizComplete";

export default function SurvivalQuizPage() {
  const { activeQuizId, activeQuizScore, survivalQuizHighestScore } =
    useAppSelector((store) => store.stats);
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
    if (!activeQuizId) return null;
    return createSurvivalQuiz(TEMP_DATA);
  }, [activeQuizId]);

  const activeQuestion = useMemo(() => {
    if (!activeQuiz) return;
    return activeQuiz.questions[questionIndex] as Question | null;
  }, [activeQuiz, questionIndex]);

  const questionResult: QuestionResult = useMemo(() => {
    if (buttonRef.current)
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    if (!chosenLetter) return "unselected";

    // if chosenLetter arr is the same length as activeQuestion answer array, then arrays must be equal to be correct
    if (chosenLetter.length === activeQuestion?.answer.length) {
      if (arraysAreEqual(activeQuestion?.answer || [], chosenLetter)) {
        return "correct";
      } else {
        return "wrong";
      }
    }

    // if chosen letter arr is not of the same length as activeQuestion answer array, check if all the answers are currently correct
    if (chosenLetter.length !== activeQuestion?.answer.length) {
      let arePickedLettersCorrect: boolean = true;
      chosenLetter.forEach((letter) => {
        if (!activeQuestion?.answer.includes(letter))
          arePickedLettersCorrect = false;
      });
      if (!arePickedLettersCorrect) return "wrong";
      return "correct-multiple";
    }

    return "unselected";
  }, [chosenLetter, activeQuestion?.answer]);

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

      dispatch(
        updateActiveQuizScore({
          questionId: activeQuestion.questionId,
          pass: false,
        }),
      );

      setTerminateQuizEarly(true);
    }
  }, [questionResult, activeQuestion?.questionId, dispatch, activeQuiz]);

  const handleNextQuestion = () => {
    // end the quiz
    if (
      questionIndex + 1 === activeQuiz?.questions.length ||
      terminateQuizEarly
    ) {
      if (activeQuizScore.length > survivalQuizHighestScore) {
        dispatch(updateSurvivalQuizHighestScore(activeQuizScore.length - 1));
      }
      dispatch(updateTryAgainQuestionIds(tempTryAgainQuestionIds));
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
          {(chosenLetter !== null &&
            chosenLetter.length === activeQuestion.answer.length) ||
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
