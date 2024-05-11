import { QuizStats } from "src/types/stats";
import { Question, Quiz } from "src/types/quiz";
import { EmojiReactions } from "src/types/enums";

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

export function getResultsReactions(result: number) {
  if (result < 18) {
    return { emoji: EmojiReactions.Terrible, message: "Terrible" };
  } else if (result < 34) {
    return { emoji: EmojiReactions.Embarassing, message: "Embarassing" };
  } else if (result < 50) {
    return { emoji: EmojiReactions.Laughable, message: "Laughable" };
  } else if (result < 74) {
    return { emoji: EmojiReactions.Good, message: "Getting there" };
  } else if (result < 90) {
    return { emoji: EmojiReactions.Great, message: "Great!" };
  } else {
    return { emoji: EmojiReactions.Amazing, message: "Amazing!" };
  }
}

export function arraysAreEqual(
  // If arrays have different lengths, they can't be equal
  arr1: (string | number)[],
  arr2: (string | number)[],
) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  // Sort the arrays to ensure elements are in the same order
  arr1.sort();
  arr2.sort();

  // Iterate over each element and compare
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // If all elements match, arrays are equal
  return true;
}
