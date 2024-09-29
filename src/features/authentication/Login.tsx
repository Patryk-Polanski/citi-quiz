import { useCallback, useEffect, useRef, useState } from "react";
import useLogin from "src/hooks/useLogin";
import usePasswordResetLink from "src/hooks/usePasswordResetLink";

import Button from "src/ui/Button";
import Input from "src/ui/form/Input";
import FormError from "src/ui/FormError";
import { checkIfEmpty } from "src/utils/validation/account";

type LoginProps = {
  closePopup: () => void;
};

const formErrorsInitialState = {
  email: "",
  password: "",
  auth: "",
};

const resetPasswordInfoInitialState = {
  error: "",
  success: "",
};

export default function Login({ closePopup }: LoginProps) {
  const { loginUser, isLoggingUserIn } = useLogin();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordResetEmailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [formErrors, setFormErrors] = useState(formErrorsInitialState);
  const [resetPasswordInfo, setResetPasswordInfo] = useState(
    resetPasswordInfoInitialState,
  );
  const [resetPasswordLinkSection, showResetPasswordLinkSection] =
    useState(false);
  const { sendPasswordResetLink, isSendingPasswordResetLinkPending } =
    usePasswordResetLink();

  useEffect(() => {
    if (formErrors.email || formErrors.password || formErrors.auth) {
      setTimeout(() => {
        setFormErrors(formErrorsInitialState);
      }, 8000);
    }
  }, [formErrors]);

  useEffect(() => {
    if (resetPasswordInfo.error || resetPasswordInfo.success) {
      setTimeout(() => {
        setResetPasswordInfo(resetPasswordInfoInitialState);
      }, 8000);
    }
  }, [resetPasswordInfo]);

  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (checkIfEmpty(emailRef?.current?.value)) {
        return setFormErrors((prevVal) => ({
          ...prevVal,
          email: "Email cannot be empty",
        }));
      }

      if (checkIfEmpty(passwordRef?.current?.value)) {
        return setFormErrors((prevVal) => ({
          ...prevVal,
          password: "Password cannot be empty",
        }));
      }

      loginUser(
        {
          email: emailRef?.current?.value as string,
          password: passwordRef?.current?.value as string,
        },
        {
          onSuccess: () => {
            closePopup();
          },
          onError: (error) => {
            setFormErrors((prevVal) => ({
              ...prevVal,
              auth: error.message,
            }));
          },
        },
      );
    },
    [loginUser, closePopup],
  );

  const handlePasswordResetLink = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (checkIfEmpty(passwordResetEmailRef?.current?.value)) {
        return setResetPasswordInfo((prev) => ({
          ...prev,
          error: "Email cannot be empty",
        }));
      }

      sendPasswordResetLink(
        { email: passwordResetEmailRef?.current?.value as string },
        {
          onSuccess: () => {
            setResetPasswordInfo((prev) => ({
              ...prev,
              success: "Check your email for reset link",
            }));
            if (passwordResetEmailRef?.current) {
              passwordResetEmailRef.current.value = "";
            }
          },
        },
      );
    },
    [sendPasswordResetLink],
  );

  return (
    <div className="text-center">
      <h5 className="mt-2 text-center font-bold">
        Login to save your quizzes data
      </h5>
      <form
        className="mb-2 mt-4 flex flex-col gap-3"
        onSubmit={handleLoginSubmit}
      >
        <Input
          id="email"
          label="Email:"
          name="email"
          type="email"
          inputRef={emailRef}
          maxLength={64}
        />
        <Input
          id="password"
          label="Password:"
          name="password"
          type="password"
          inputRef={passwordRef}
          maxLength={20}
        />
        <Button
          el="button"
          type="button"
          omitStyles
          classes="inline underline text-sm"
          onClick={() => showResetPasswordLinkSection((prev) => !prev)}
        >
          Forgot password?
        </Button>
        <Button
          el="button"
          type="submit"
          classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg font-bold"
          disabled={isLoggingUserIn}
          isLoading={isLoggingUserIn}
        >
          Submit
        </Button>
        {formErrors.email && <FormError error={formErrors.email} />}
        {formErrors.password && <FormError error={formErrors.password} />}
        {formErrors.auth && <FormError error={formErrors.auth} />}
      </form>
      {resetPasswordLinkSection && (
        <form
          className="mb-2 mt-6 flex flex-col gap-3 border-t-2 border-dashed pt-6"
          onSubmit={handlePasswordResetLink}
        >
          <Input
            id="email"
            label="Email:"
            name="email"
            type="email"
            inputRef={passwordResetEmailRef}
            maxLength={64}
          />
          <Button
            el="button"
            type="submit"
            classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg font-bold"
            disabled={isSendingPasswordResetLinkPending}
            isLoading={isSendingPasswordResetLinkPending}
          >
            Send
          </Button>
          {resetPasswordInfo.error && (
            <FormError error={resetPasswordInfo.error} />
          )}
          {resetPasswordInfo.success && (
            <small className="mt-1 text-sm font-bold text-green-900">
              {resetPasswordInfo.success}
            </small>
          )}
        </form>
      )}
    </div>
  );
}
