import { useMutation } from "@tanstack/react-query";

import { loginUser as authLoginUser } from "src/lib/@firebase";

const useLogin = () => {
  const { mutate: loginUser, isPending: isLoggingUserIn } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await authLoginUser(email, password);
    },
    onSuccess: () => {
      console.log("user signed in");
    },
    onError: (error) => {
      console.error("could not sign in the user", error);

      if (error.message.includes("auth/user-not-found"))
        error.message = "Email not found. Try again";
      else if (error.message.includes("auth/wrong-password"))
        error.message = "Wrong password. Try again";
      else if (error.message.includes("auth/too-many-requests"))
        error.message = "Too many faileds attempts. Try again later";
      else error.message = error.message.substring(0, 60) + "...";

      throw new Error(error.message);
    },
  });

  return { loginUser, isLoggingUserIn };
};

export default useLogin;
