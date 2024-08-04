export type UserStats = {
  quizzes: QuizStats[][];
  tryAgainQuestionIds: string[];
  activeQuizNumber: number | null;
  activeQuizScore: QuizStats[];
  survivalQuizHighestScore: number;
};

export type QuizStats = { questionId: string | null; pass: boolean };
