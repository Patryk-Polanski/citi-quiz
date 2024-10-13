import { useQuery } from "@tanstack/react-query";
import { fetchDocument } from "src/lib/@firebase";
import { transformObjToQuizzesArr } from "src/utils/dataManipulation";
import { DefaultValueTypes } from "./useLocalStorage";

const useUserStats = (userId: string | undefined) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["userData", userId],
    queryFn: async ({ queryKey }) => {
      const [, userId] = queryKey;
      if (!userId) return null;

      const docSnap = await fetchDocument("userData", userId);
      const dbData = docSnap?.data();

      const formattedQuizzes = transformObjToQuizzesArr(dbData?.stats.quizzes);

      return {
        ...dbData,
        stats: {
          ...dbData?.stats,
          quizzes: formattedQuizzes,
        },
      } as DefaultValueTypes;
    },
  });

  return { isLoading, isError, data };
};

export default useUserStats;
