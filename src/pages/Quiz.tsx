import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  resetActiveQuiz,
  setActiveQuiz,
  updateActiveQuizScore,
} from "src/store/stats-slice";
import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import { BlobGradients, IconNames } from "src/types/enums";
import { type QuestionResult, type Question, Quiz } from "src/types/quiz";
import { TEMP_DATA } from "src/utils/constants";

import ProgressBar from "../features/quiz/ProgressBar";
import QuizHeader from "../features/quiz/QuizHeader";
import AnswerCard from "../features/quiz/AnswerCard";
import Button from "../ui/Button";
import Icon from "../ui/Icons/Icon";

export default function QuizPage() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { activeQuizId } = useAppSelector((store) => store.stats);
  const dispatch = useAppDispatch();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chosenLetter, setChosenLetter] = useState<string | null>(null);

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
    } else if (chosenLetter !== activeQuestion?.answer) {
      return "wrong";
    }
    return "unselected";
  }, [chosenLetter, activeQuestion?.answer]);

  useEffect(() => {
    dispatch(setActiveQuiz(quizId || null));
    return () => {
      dispatch(setActiveQuiz(null));
    };
  }, [dispatch, quizId]);

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
      dispatch(
        updateActiveQuizScore({
          questionId: activeQuestion.questionId,
          pass: false,
        }),
      );
    }
  }, [questionResult, activeQuestion?.questionId, dispatch]);

  const handleNextQuestion = () => {
    if (questionIndex + 1 === activeQuiz?.questions.length) {
      alert("Quiz complete");
      navigate("/");
      dispatch(resetActiveQuiz());
      return;
    }
    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    setChosenLetter(null);
  };

  return activeQuiz && activeQuestion ? (
    <>
      <QuizHeader quizId={activeQuiz.quizId} />
      <ProgressBar questionsNumber={activeQuiz.questions.length} />
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
