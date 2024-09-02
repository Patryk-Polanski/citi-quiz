import { useMutation } from "@tanstack/react-query";

import { loginUser as authLoginUser } from "src/lib/@firebase";

const useSignup = () => {
  const { mutate: loginUser, isPending: isLogginUserIn } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      authLoginUser(email, password);
    },
    onSuccess: () => {
      console.log("user signed in");
    },
    onError: () => {
      console.error("could not sign in the user");
    },
  });

  return { loginUser, isLogginUserIn };
};

export default useSignup;
