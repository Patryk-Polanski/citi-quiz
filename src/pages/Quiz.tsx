import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { setActiveQuiz } from "../store/stats-slice";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { BlobGradients, IconNames } from "../types/enums";
import { type QuestionResult, type Question, Quiz } from "../types/quiz";
import { TEMP_DATA } from "../utils/constants";

import ProgressBar from "../features/quiz/ProgressBar";
import QuizHeader from "../features/quiz/QuizHeader";
import AnswerCard from "../features/quiz/AnswerCard";
import Button from "../ui/Button";
import Icon from "../ui/icons/_Icon";

export default function QuizPage() {
  const { quizId } = useParams();
  const { activeQuizId } = useAppSelector((store) => store.stats);
  const dispatch = useAppDispatch();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chosenLetter, setChosenLetter] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setActiveQuiz(quizId || null));
    return () => {
      dispatch(setActiveQuiz(null));
    };
  }, [dispatch, quizId]);

  const activeQuiz = useMemo(() => {
    if (!activeQuizId) return null;
    return TEMP_DATA.find((quiz) => quiz.quizId === activeQuizId) as
      | Quiz
      | undefined;
  }, [activeQuizId]);

  const activeQuestion = useMemo(() => {
    if (!activeQuiz) return;
    return activeQuiz.questions[questionIndex] as Question | null;
  }, [activeQuiz, questionIndex]);

  const questionResult: QuestionResult = useMemo(() => {
    if (chosenLetter === null) return "unselected";

    if (chosenLetter === activeQuestion?.answer) {
      return "correct";
    } else {
      return "wrong";
    }
  }, [chosenLetter, activeQuestion?.answer]);

  const handleNextQuestion = () => {
    if (questionIndex + 1 === activeQuiz?.questions.length) {
      alert("Quiz complete");
      return;
    }
    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    setChosenLetter(null);
  };

  return activeQuiz && activeQuestion ? (
    <>
      <QuizHeader quizId={activeQuiz.quizId} />
      <ProgressBar />
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
      {chosenLetter !== null ? (
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
    </>
  ) : (
    // Show error message
    <div className="mt-8 flex flex-col items-center justify-center gap-8">
      <p>Could not find a quiz with an id of {quizId}</p>
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
