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
    onError: () => {
      console.error("could not sign in the user");
    },
  });

  return { loginUser, isLoggingUserIn };
};

export default useLogin;
