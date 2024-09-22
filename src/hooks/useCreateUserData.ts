import { useMutation } from "@tanstack/react-query";

import { setData } from "src/lib/@firebase";
import useQuizzes from "./useQuizzes";
import { initialUserData } from "src/utils/constants";
import { transformQuizzesArrToObj } from "src/utils/dataManipulation";

const useCreateUserData = () => {
  const { data: quizzesData } = useQuizzes();
  const { mutate: createUserData } = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      const initialStats = initialUserData.stats(quizzesData);
      const formattedQuizzes = transformQuizzesArrToObj(initialStats.quizzes);
      await setData("userData", userId, {
        stats: {
          quizzes: formattedQuizzes,
          tryAgainQuestionIds: [],
          survivalQuizHighestScore: 0,
        },
        settings: initialUserData.settings,
      });
    },
    onSuccess: () => {
      console.log("user data set");
    },
    onError: (error) => {
      console.error("could not create user stats", error);
    },
  });

  return { createUserData };
};

export default useCreateUserData;
