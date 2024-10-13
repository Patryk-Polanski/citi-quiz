export type UserStats = {
  quizzes: QuizStats[][];
  tryAgainQuestionIds: string[];
  activeQuizNumber: number | string | null;
  activeQuizScore: QuizStats[];
  survivalQuizHighestScore: number;
};

export type QuizStats = { questionId: string | null; pass: boolean };

export type DefaultStatsValueTypes = {
  quizzes: UserStats["quizzes"];
  tryAgainQuestionIds: UserStats["tryAgainQuestionIds"];
  survivalQuizHighestScore: UserStats["survivalQuizHighestScore"];
};

export type DefaultSettingsValueTypes = {
  fontSize: string;
  background: string;
};

export type DefaultValueTypes =
  | {
      stats: DefaultStatsValueTypes;
      settings: DefaultSettingsValueTypes;
    }
  | object;
