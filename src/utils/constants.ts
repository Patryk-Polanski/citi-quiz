import { Quiz } from "src/types/quiz";

// stats is a function as it needs to loop through fetched quizzes
export const initialUserData = {
  stats: (quizzes: Quiz[]) => {
    const derivedStats = quizzes.map((quiz) => {
      const questionsStats = quiz.questions.map((question) => ({
        questionId: question.questionId,
        pass: false,
      }));
      return questionsStats;
    });
    return {
      quizzes: derivedStats,
      tryAgainQuestionIds: [],
      survivalQuizHighestScore: 0,
    };
  },
  settings: {
    fontSize: "medium",
    background: "bg-sky-600",
  },
};
