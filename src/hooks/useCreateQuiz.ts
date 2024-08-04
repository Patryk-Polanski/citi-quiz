import { useMutation } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "src/lib/firebase";

const useCreateQuiz = () => {
  const { mutate: createQuiz, isPending: isCreatingQuiz } = useMutation({
    mutationFn: async () => {
      const rawJsonQuizzes = await fetch("src/utils/quizzesData.json");
      const jsonQuizzes = await rawJsonQuizzes.json();
      const quizzesDbRef = collection(db, "quizzes");
      addDoc(quizzesDbRef, jsonQuizzes.quizzes[10]);
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
