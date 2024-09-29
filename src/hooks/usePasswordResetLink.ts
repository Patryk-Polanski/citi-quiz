import { useMutation } from "@tanstack/react-query";
import { resetUserPasswordEmail } from "src/lib/@firebase";

const usePasswordResetLink = () => {
  const {
    mutate: sendPasswordResetLink,
    isPending: isSendingPasswordResetLinkPending,
  } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      // use Firestore password reset link method
      resetUserPasswordEmail(email);
    },
    onSuccess: () => {
      console.log("password reset link has been sent");
    },
    onError: (error) => {
      console.error("could not send password reset link", error);
    },
  });

  return { sendPasswordResetLink, isSendingPasswordResetLinkPending };
};

export default usePasswordResetLink;
