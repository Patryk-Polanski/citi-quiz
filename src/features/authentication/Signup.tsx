import { useCallback, useRef, useState } from "react";

import useSignup from "src/hooks/useSignup";

import Button from "src/ui/Button";
import Input from "src/ui/form/Input";
import {
  checkIfEmpty,
  checkIfNotIdentical,
} from "src/utils/validation/account";

export default function Signup() {
  const { createUser, isCreatingUser } = useSignup();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSignup = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (checkIfEmpty(emailRef?.current?.value))
        return setValidationErrors((prevVal) => ({
          ...prevVal,
          email: "Email cannot be empty",
        }));
      if (checkIfEmpty(passwordRef?.current?.value))
        return setValidationErrors((prevVal) => ({
          ...prevVal,
          password: "Password cannot be empty",
        }));
      if (checkIfEmpty(passwordConfirmationRef?.current?.value))
        return setValidationErrors((prevVal) => ({
          ...prevVal,
          passwordConfirmation: "Password confirmation cannot be empty",
        }));
      if (
        checkIfNotIdentical(
          passwordRef?.current?.value,
          passwordConfirmationRef?.current?.value,
        )
      )
        return setValidationErrors((prevVal) => ({
          ...prevVal,
          passwordConfirmation: "Both passwords must be identical",
        }));

      await createUser({
        email: emailRef?.current?.value as string,
        password: passwordRef?.current?.value as string,
      });
    },
    [createUser],
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
        {validationErrors.email && <p>{validationErrors.email}</p>}
        <Input
          id="password"
          label="Password:"
          name="password"
          type="password"
          inputRef={passwordRef}
          maxLength={20}
        />
        {validationErrors.password && <p>{validationErrors.password}</p>}
        <Input
          id="conform-password"
          label="Confirm password:"
          name="confirm-password"
          type="password"
          inputRef={passwordConfirmationRef}
          maxLength={20}
        />
        {validationErrors.passwordConfirmation && (
          <p>{validationErrors.passwordConfirmation}</p>
        )}
        <Button
          el="button"
          type="submit"
          classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg font-bold"
          disabled={isCreatingUser}
          isLoading={isCreatingUser}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
