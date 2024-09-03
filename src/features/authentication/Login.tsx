import { useCallback, useRef, useState } from "react";
import useLogin from "src/hooks/useLogin";

import Button from "src/ui/Button";
import Input from "src/ui/form/Input";
import { checkIfEmpty } from "src/utils/validation/account";

export default function Login() {
  const { loginUser, isLoggingUserIn } = useLogin();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (checkIfEmpty(emailRef?.current?.value)) {
        return setValidationErrors((prevVal) => ({
          ...prevVal,
          email: "Email cannot be empty",
        }));
      }

      if (checkIfEmpty(passwordRef?.current?.value)) {
        return setValidationErrors((prevVal) => ({
          ...prevVal,
          password: "Password cannot be empty",
        }));
      }

      await loginUser({
        email: emailRef?.current?.value as string,
        password: passwordRef?.current?.value as string,
      });
    },
    [loginUser],
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
        />
        {validationErrors.email && <p>{validationErrors.email}</p>}
        <Input
          id="password"
          label="Password:"
          name="password"
          type="password"
          inputRef={passwordRef}
        />
        {validationErrors.password && <p>{validationErrors.password}</p>}
        <Button
          el="button"
          type="submit"
          classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg font-bold"
          disabled={isLoggingUserIn}
          isLoading={isLoggingUserIn}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
