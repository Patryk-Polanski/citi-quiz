import { QuizStats } from "src/types/stats";
import { Question, Quiz } from "src/types/quiz";
import { generateRandomNumber } from "./helpers";

export function calcHighestScore(quizResults: QuizStats[]) {
  return quizResults.reduce(
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

  return { quizId: "try-again", questions: tryAgainQuiz };
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

  return { quizId: "survival", questions: survivalQuizRandom };
}
