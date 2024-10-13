import { useCallback, useEffect, useRef, useState } from "react";

import useSignup from "src/hooks/useSignup";

import Button from "src/ui/Button";
import Input from "src/ui/form/Input";
import FormError from "src/ui/FormError";
import {
  checkIfEmpty,
  checkIfNotIdentical,
} from "src/utils/validation/account";

type SignupProps = {
  closePopup: () => void;
};

const formErrorsInitialState = {
  email: "",
  username: "",
  password: "",
  passwordConfirmation: "",
  auth: "",
};

export default function Signup({ closePopup }: SignupProps) {
  const { createUser, isCreatingUser, isCompletingProfile } = useSignup();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);
  const [formErrors, setFormErrors] = useState(formErrorsInitialState);

  useEffect(() => {
    if (
      formErrors.email ||
      formErrors.username ||
      formErrors.password ||
      formErrors.passwordConfirmation ||
      formErrors.auth
    ) {
      setTimeout(() => {
        setFormErrors(formErrorsInitialState);
      }, 10000);
    }
  }, [formErrors]);

  const handleSignup = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (checkIfEmpty(emailRef?.current?.value)) {
        return setFormErrors((prevVal) => ({
          ...prevVal,
          email: "Email cannot be empty",
        }));
      }
      if (checkIfEmpty(usernameRef?.current?.value)) {
        return setFormErrors((prevVal) => ({
          ...prevVal,
          username: "Username cannot be empty",
        }));
      }
      if (checkIfEmpty(passwordRef?.current?.value)) {
        return setFormErrors((prevVal) => ({
          ...prevVal,
          password: "Password cannot be empty",
        }));
      }
      if (checkIfEmpty(passwordConfirmationRef?.current?.value)) {
        return setFormErrors((prevVal) => ({
          ...prevVal,
          passwordConfirmation: "Password confirmation cannot be empty",
        }));
      }
      if (
        checkIfNotIdentical(
          passwordRef?.current?.value,
          passwordConfirmationRef?.current?.value,
        )
      ) {
        return setFormErrors((prevVal) => ({
          ...prevVal,
          passwordConfirmation: "Both passwords must be identical",
        }));
      }

      createUser(
        {
          email: emailRef?.current?.value as string,
          password: passwordRef?.current?.value as string,
          username: usernameRef?.current?.value as string,
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
    [createUser, closePopup],
  );

  return (
    <div className="text-center">
      <h5 className="mt-2 text-center font-bold">Create an account</h5>
      <form className="mb-2 mt-4 flex flex-col gap-3" onSubmit={handleSignup}>
        <Input
          id="email"
          label="Email:"
          name="email"
          type="email"
          inputRef={emailRef}
          maxLength={64}
        />
        <Input
          id="username"
          label="Username:"
          name="username"
          inputRef={usernameRef}
        />
        <Input
          id="password"
          label="Password:"
          name="password"
          type="password"
          inputRef={passwordRef}
          maxLength={20}
        />
        <Input
          id="conform-password"
          label="Confirm password:"
          name="confirm-password"
          type="password"
          inputRef={passwordConfirmationRef}
          maxLength={20}
        />
        <Button
          el="button"
          type="submit"
          classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg font-bold"
          disabled={isCreatingUser || isCompletingProfile}
          isLoading={isCreatingUser || isCompletingProfile}
        >
          Submit
        </Button>
        {formErrors.email && <FormError error={formErrors.email} />}
        {formErrors.username && <FormError error={formErrors.username} />}
        {formErrors.password && <FormError error={formErrors.password} />}
        {formErrors.passwordConfirmation && (
          <FormError error={formErrors.passwordConfirmation} />
        )}
        {formErrors.auth && <FormError error={formErrors.auth} />}
      </form>
    </div>
  );
}
