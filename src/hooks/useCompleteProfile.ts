import { useMutation } from "@tanstack/react-query";

import { completeProfile as authCompleteProfile } from "src/lib/@firebase";
import { useAppDispatch } from "./useStore";
import { setUserName } from "src/store/auth-slice";

const useCompleteProfile = () => {
  const dispatch = useAppDispatch();
  const { mutate: completeProfile, isPending: isCompletingProfile } =
    useMutation({
      mutationFn: async ({ displayName }: { displayName: string }) => {
        await authCompleteProfile(displayName);
      },
      onSuccess: async (data, variables) => {
        console.log("completed profile");
        dispatch(setUserName(variables.displayName));
      },
      onError: (error) => {
        console.error("could not complete profile", error);
        error.message = error.message.substring(0, 60) + "...";

        throw new Error(error.message);
      },
    });

  return { completeProfile, isCompletingProfile };
};

export default useCompleteProfile;
