export type userStats = {
  quizzes: quizStats[];
  tryAgainQuestionIds: string[];
  activeQuizId: string;
};

export type quizStats = {
  questions: [questionId: string, pass: boolean];
};
