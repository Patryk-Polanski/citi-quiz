import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "src/lib/firebase";
import { Quiz } from "src/types/quiz";

const useQuizzes = () => {
  const [isEmptyError, setIsEmptyError] = useState(false);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const quizzes: Quiz[] = [];
      const quizzesDbRef = collection(db, "quizzes");
      const snapshot = await getDocs(quizzesDbRef);
      snapshot.docs.forEach((doc) => {
        quizzes.push({
          ...(doc.data() as Omit<Quiz, "quizId">),
          quizId: doc.id,
        });
      });

      if (quizzes.length < 1) setIsEmptyError(true);

      return quizzes;
    },
  });
  return { isLoading, isError, isEmptyError, data };
};

export default useQuizzes;
