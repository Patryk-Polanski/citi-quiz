import { useMutation } from "@tanstack/react-query";

import { createUser as authCreateUser } from "src/lib/@firebase";

const useSignup = () => {
  const { mutate: createUser, isPending: isCreatingUser } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await authCreateUser(email, password);
    },
    onSuccess: () => {
      console.log("new user created");
    },
    onError: () => {
      console.error("could not create new user");
    },
  });

  return { createUser, isCreatingUser };
};

export default useSignup;
