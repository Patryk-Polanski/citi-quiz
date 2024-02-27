import { useParams } from "react-router-dom";

enum QuizTypes {
  Survival = "survival",
  TryAgain = "try-again",
  Standard = "standard",
}

export default function QuizPage() {
  const { quizId } = useParams();

  if (quizId === QuizTypes.Survival) {
    return <h1>This is a survival quiz</h1>;
  }

  if (quizId === QuizTypes.TryAgain) {
    return <h1>This is a try again quiz</h1>;
  }

  return <h1>This is a standard quiz</h1>;
}
