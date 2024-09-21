import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "./useStore";
import { updateData } from "src/lib/@firebase";

const useUpdateUserStats = () => {
  const { user } = useAppSelector((store) => store.auth);
  const { mutate: updateUserStats } = useMutation({
    mutationFn: async ({ dataToUpdate }: { dataToUpdate: unknown }) => {
      await updateData("userData", user?.uid, dataToUpdate);
    },
    onSuccess: () => {
      console.log("user data updated");
    },
    onError: (error) => {
      console.error("could not update user stats", error);
    },
  });

  return { updateUserStats };
};

export default useUpdateUserStats;
