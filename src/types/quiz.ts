export type Option = {
  letter: string;
  answer: string;
};

export type Question = {
  questionId: string;
  question: string;
  options: Option[];
  answer: string[];
  explanation: string;
};

export type Quiz = {
  quizId: string;
  questions: Question[];
};

export type QuestionResult =
  | "unselected"
  | "correct"
  | "correct-multiple"
  | "wrong";
