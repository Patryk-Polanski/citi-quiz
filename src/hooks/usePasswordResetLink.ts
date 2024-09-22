import { useMutation } from "@tanstack/react-query";

const usePasswordResetLink = () => {
  const {
    mutate: sendPasswordResetLink,
    isPending: isSendingPasswordResetLinkPending,
  } = useMutation({
    mutationFn: async () => {
      // use Firestore password reset link method
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
