export type Option = {
  letter: string;
  answer: string;
};

export type Question = {
  questionId: string;
  question: string;
  options: Option[];
  correctAnswer: string[];
  explanation: string;
};

export type Quiz = {
  quizId: string;
  questions: Question[];
  quizNumber: string;
};

export type QuestionResult =
  | "unselected"
  | "correct"
  | "correct-multiple"
  | "wrong";
