import { useQuery } from "@tanstack/react-query";
import { fetchDocument } from "src/lib/@firebase";
import { transformObjToQuizzesArr } from "src/utils/dataManipulation";

const useUserStats = (userId: string | undefined) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["userData", userId],
    queryFn: async ({ queryKey }) => {
      const [_key, userId] = queryKey;
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
      };
    },
  });

  return { isLoading, isError, data };
};

export default useUserStats;
