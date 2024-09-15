import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCollection } from "src/lib/@firebase";
import { Quiz } from "src/types/quiz";

const useQuizzes = () => {
  const [isEmptyError, setIsEmptyError] = useState(false);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const quizzes: Quiz[] = [];
      const snapshot = await fetchCollection("quizzes", "quizNumber");
      snapshot?.docs?.forEach((doc) => {
        quizzes.push({
          ...(doc.data() as Omit<Quiz, "quizId">),
          quizId: doc.id,
        });
      });

      if (quizzes.length < 1) setIsEmptyError(true);

      return quizzes;
    },
  });
  return { isLoading, isError, isEmptyError, data: data as Quiz[] };
};

export default useQuizzes;
