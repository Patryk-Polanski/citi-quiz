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

export type Quiz = {
  quizId: string;
  questions: Question[];
};

export type QuestionResult = "unselected" | "correct" | "wrong";
