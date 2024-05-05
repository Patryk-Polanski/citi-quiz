import { quizStats } from "src/types/stats";
import { Question, Quiz } from "src/types/quiz";
import { EmojiNames } from "src/types/enums";

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calcHighestScore(quizResults: quizStats[]) {
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
    const randomNumber = generateRandomNumber(0, survivalQuiz.length - index);
    survivalQuizRandom[randomNumbers[randomNumber]] = question;
    randomNumbers.splice(randomNumber, 1);
  });

  return { quizId: "survival", questions: survivalQuizRandom };
}

export function getResultsReactions(result: number) {
  if (result < 18) {
    return { emoji: EmojiNames.ReactionTerrible, message: "Terrible" };
  } else if (result < 34) {
    return { emoji: EmojiNames.ReactionEmbarassing, message: "Embarassing" };
  } else if (result < 52) {
    return { emoji: EmojiNames.ReactionLaughable, message: "Laughable" };
  } else if (result < 70) {
    return { emoji: EmojiNames.ReactionGood, message: "Good" };
  } else if (result < 86) {
    return { emoji: EmojiNames.ReactionGreat, message: "Great" };
  } else {
    return { emoji: EmojiNames.ReactionAmazing, message: "Amazing" };
  }
}
