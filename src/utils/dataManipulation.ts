import { MutableRefObject } from "react";

import { QuizStats } from "src/types/stats";
import { Question, Quiz } from "src/types/quiz";
import { arraysAreEqual, generateRandomNumber } from "./helpers";

export function calcHighestScore(quizResults: QuizStats[]) {
  return quizResults?.reduce(
    (acc, question) => (question.pass ? acc + 1 : acc),
    0,
  );
}

export function createTryAgainQuiz(
  allQuizzes: Quiz[],
  tryAgainQuestionIds: string[],
) {
  const tryAgainQuiz = tryAgainQuestionIds.map((tryAgainQuestionId) => {
    let foundQuestion: Question | undefined;
    allQuizzes.forEach((quiz) => {
      const questionExists = quiz.questions.find(
        (question) => question.questionId === tryAgainQuestionId,
      );
      if (questionExists) foundQuestion = questionExists;
    });
    return foundQuestion;
  });

  return { quizNumber: "try-again", questions: tryAgainQuiz };
}

export function createSurvivalQuiz(allQuizzes: Quiz[]) {
  const survivalQuiz: Question[] = [];
  allQuizzes.forEach((quiz) => {
    survivalQuiz.push(...quiz.questions);
  });
  const survivalQuizRandom: Question[] = [];
  const randomNumbers = Array.from(
    Array(survivalQuiz.length),
    (_, index) => index,
  );

  survivalQuiz.forEach((question, index) => {
    const randomNumber = generateRandomNumber(
      0,
      survivalQuiz.length - (index + 1),
    );
    survivalQuizRandom[randomNumbers[randomNumber]] = question;
    randomNumbers.splice(randomNumber, 1);
  });

  return { quizNumber: "survival", questions: survivalQuizRandom };
}

export function calculateQuestionResult(
  buttonRef: MutableRefObject<HTMLDivElement | null>,
  correctAnswer: string[] | undefined,
  chosenLetter: string[] | null,
) {
  if (buttonRef.current)
    buttonRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  if (!chosenLetter) return "unselected";

  // if chosenLetter arr is the same length as activeQuestion answer array, then arrays must be equal to be correct
  if (chosenLetter.length === correctAnswer?.length) {
    if (arraysAreEqual(correctAnswer || [], chosenLetter)) {
      return "correct";
    } else {
      return "wrong";
    }
  }

  // if chosen letter arr is not of the same length as activeQuestion answer array, check if all the answers are currently correct
  if (chosenLetter.length !== correctAnswer?.length) {
    let arePickedLettersCorrect: boolean = true;
    chosenLetter.forEach((letter) => {
      if (!correctAnswer?.includes(letter)) arePickedLettersCorrect = false;
    });
    if (!arePickedLettersCorrect) return "wrong";
    return "correct-multiple";
  }

  return "unselected";
}

export function transformQuizzesArrToObj(quizzes: QuizStats[][]) {
  const result = {};

  quizzes.forEach((quiz) => {
    quiz.forEach((question) => {
      const questionInfo = question.questionId?.split("-");
      const quizId = Number(questionInfo?.[0]);
      const questionId = Number(questionInfo?.[1]);

      if (typeof result[quizId] !== "object") {
        result[quizId] = {};
      }
      result[quizId][questionId] = question;
    });
  });

  return result;
}

export function transformObjToQuizzesArr(obj: QuizObject) {
  const quizArray = Object.values(obj);
  const formattedQuizzesAndQuestions = quizArray.map((quizzObj) => {
    return Object.values(quizzObj);
  });
  return formattedQuizzesAndQuestions;
}
