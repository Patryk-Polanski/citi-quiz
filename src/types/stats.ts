export type userStats = {
  quizzes: quizStats[][];
  tryAgainQuestionIds: string[];
  activeQuizId: string | null;
  activeQuizScore: quizStats[];
};

export type quizStats = { questionId: string | null; pass: boolean };
