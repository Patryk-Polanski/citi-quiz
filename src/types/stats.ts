export type userStats = {
  quizzes: quizStats[][];
  tryAgainQuestionIds: string[];
  activeQuizId: string | null;
  activeQuizScore: quizStats[];
  survivalQuizHighestScore: number;
};

export type quizStats = { questionId: string | null; pass: boolean };
