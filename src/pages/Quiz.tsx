import { useParams } from "react-router-dom";

import { IconNames, QuizTypes } from "../types/enums";
import ProgressBar from "../features/quiz/ProgressBar";
import QuizHeader from "../features/quiz/QuizHeader";
import AnswerCard from "../features/quiz/AnswerCard";
import Button from "../ui/Button";
import Icon from "../ui/icons/_Icon";
import { useMemo, useRef, useState } from "react";
import { type QuestionResult, type Question, type Quiz } from "../types/quiz";

const tempQuiz: Quiz = {
  quizId: "1",
  score: [],
  questions: [
    {
      questionId: "1-1",
      question: "In which country is the Lake District?",
      options: [
        {
          letter: "A",
          answer: "Scotland",
        },
        {
          letter: "B",
          answer: "Northern Ireland",
        },
        {
          letter: "C",
          answer: "Wales",
        },
        {
          letter: "D",
          answer: "England",
        },
      ],
      answer: "D",
      explanation: "Lake District is situated in England.",
    },
    {
      questionId: "1-2",
      question: "Which of the following is associated with Christmas?",
      options: [
        {
          letter: "A",
          answer: "Santa Claus",
        },
        {
          letter: "B",
          answer: "Sending anonymous cards",
        },
        {
          letter: "C",
          answer: "Guy Fawkes",
        },
        {
          letter: "D",
          answer: "Practical jokes",
        },
      ],
      answer: "A",
      explanation:
        "Santa Claus is one of the main talking points during Christmas.",
    },
    {
      questionId: "1-3",
      question: "Which of the following statements is correct?",
      options: [
        {
          letter: "A",
          answer: "In the UK, betting and gambling were illegal until 2005",
        },
        {
          letter: "B",
          answer: "In the UK, betting and gamblig are legal",
        },
      ],
      answer: "B",
      explanation: "Betting and gambling have always been legal in the UK.",
    },
    {
      questionId: "1-4",
      question:
        "The game of golf is traditionally thought to have originated in which country?",
      options: [
        {
          letter: "A",
          answer: "England",
        },
        {
          letter: "B",
          answer: "Spain",
        },
        {
          letter: "C",
          answer: "USA",
        },
        {
          letter: "D",
          answer: "Scotland",
        },
      ],
      answer: "D",
      explanation:
        "Scotland was the nation to invent the first version of golf.",
    },
  ],
};

export default function QuizPage() {
  const { quizId } = useParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chosenLetter, setChosenLetter] = useState("-1");

  const currentQuestion = useRef<Question | null>(
    tempQuiz.questions[questionIndex],
  );

  const questionResult: QuestionResult = useMemo(() => {
    if (chosenLetter === "-1") return "unselected";

    if (chosenLetter === currentQuestion.current?.answer) {
      alert("correct");
      return "correct";
    } else {
      alert("wrong");
      return "wrong";
    }
  }, [chosenLetter]);

  const handleNextQuestion = () => {
    if (questionIndex === tempQuiz.questions.length - 1) {
      alert("Quiz complete");
      return;
    }

    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    currentQuestion.current = tempQuiz.questions[questionIndex + 1];
    setChosenLetter("-1");
  };

  return currentQuestion.current ? (
    <>
      <QuizHeader quizId={tempQuiz.quizId} />
      <ProgressBar />
      <div className="mt-8 text-center font-laila">
        <h4 className="text-2xl">Question {questionIndex + 1}</h4>
        <h4 className="mt-4 text-2xl">{currentQuestion.current.question}</h4>
      </div>
      <div className="mt-8 flex flex-col gap-4 font-laila text-xl">
        {currentQuestion.current.options.map((option) => (
          <AnswerCard
            key={option.letter}
            option={option}
            chosenLetter={chosenLetter}
            questionResult={questionResult}
            onOptionSelect={setChosenLetter}
          />
        ))}
      </div>
      {chosenLetter !== "-1" ? (
        <div className="mt-6 flex flex-col items-center justify-center gap-6">
          <Button onClick={handleNextQuestion} el="button">
            <span>
              {questionIndex < tempQuiz.questions.length - 1
                ? "Next question"
                : "Finish"}
            </span>
            <span className="w-[2px] self-stretch bg-white opacity-60" />
            <Icon iconName={IconNames.Chevron} className="h-5 w-5" />
          </Button>
          <p>{currentQuestion.current.explanation}</p>
        </div>
      ) : null}
    </>
  ) : null;
}
