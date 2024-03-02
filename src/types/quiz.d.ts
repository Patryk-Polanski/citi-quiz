export type Option = {
  letter: string;
  answer: string;
};

export type Question = {
  questionId: string;
  question: string;
  options: option[];
  answer: string;
  explanation: string;
};

export type Score = {
  questionId: string;
  passed: boolean;
};

export type Quiz = {
  quizId: string;
  score: Score[];
  questions: Question[];
};
