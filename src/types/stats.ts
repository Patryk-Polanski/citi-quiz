export type UserStats = {
  quizzes: QuizStats[][];
  tryAgainQuestionIds: string[];
  activeQuizId: string | null;
  activeQuizScore: QuizStats[];
  survivalQuizHighestScore: number;
};

export type QuizStats = { questionId: string | null; pass: boolean };
