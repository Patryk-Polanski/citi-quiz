export type userStats = {
  quizzes: quizStats[];
  tryAgainQuestionIds: string[];
  activeQuizId: string;
  activeQuizScore: quizStats[];
};

export type quizStats = {
  questions: [questionId: string, pass: boolean];
};
