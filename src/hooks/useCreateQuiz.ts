import { useMutation } from "@tanstack/react-query";
import { addData } from "src/lib/@firebase";

const useCreateQuiz = () => {
  const { mutate: createQuiz, isPending: isCreatingQuiz } = useMutation({
    mutationFn: async () => {
      const rawJsonQuizzes = await fetch("src/utils/quizzesData.json");
      const jsonQuizzes = await rawJsonQuizzes.json();
      addData("quizzes", jsonQuizzes.quizzes[15]);
    },
    onSuccess: () => {
      console.log("new quiz successfully added!");
    },
    onError: () => {
      console.error("could not create quiz!");
    },
  });

  return { createQuiz, isCreatingQuiz };
};

export default useCreateQuiz;
