import { useMutation } from "@tanstack/react-query";

import { logoutUser as authLogoutUser } from "src/lib/@firebase";

const useLogout = () => {
  const { mutate: logoutUser, isPending: isLoggingUserOut } = useMutation({
    mutationFn: async () => {
      await authLogoutUser();
    },
    onSuccess: () => {
      console.log("user signed out");
    },
    onError: (error) => {
      console.error("ould not sign out the user", error);
    },
  });

  return { logoutUser, isLoggingUserOut };
};

export default useLogout;
