import { EmojiReactions } from "src/types/enums";
import { QuizObject } from "src/types/quiz";
import { QuizStats } from "src/types/stats";

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const result = Object.values(obj);
  return result;
}
