import { useMutation } from "@tanstack/react-query";

import { createUser as authCreateUser } from "src/lib/@firebase";
import useCompleteProfile from "./useCompleteProfile";
import useCreateUserData from "./useCreateUserData";

const useSignup = () => {
  const { completeProfile, isCompletingProfile } = useCompleteProfile();
  const { createUserData } = useCreateUserData();
  const { mutate: createUser, isPending: isCreatingUser } = useMutation({
    mutationFn: async ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      const user = await authCreateUser(email, password);
      return user;
    },
    onSuccess: async (data, variables) => {
      console.log("new user created");
      await completeProfile({ displayName: variables.username });
      await createUserData({ userId: data?.uid });
    },
    onError: (error) => {
      console.error("could not create new user", error);

      if (error.message.includes("auth/email-already-in-use"))
        error.message = "Email already in use. Try different email";
      if (error.message.includes("auth/weak-password"))
        error.message = "Password needs to be at least 6 characters long";
      else if (error.message.includes("auth/too-many-requests"))
        error.message = "Too many faileds attempts. Try again later";
      else error.message = error.message.substring(0, 60) + "...";

      throw new Error(error.message);
    },
  });

  return { createUser, isCreatingUser, isCompletingProfile };
};

export default useSignup;
