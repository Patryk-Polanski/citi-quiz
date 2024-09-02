import { useCallback, useRef } from "react";

import Button from "src/ui/Button";
import Input from "src/ui/form/Input";

export default function Login() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleLoginSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(
        "onLoginSubmit",
        usernameRef.current?.value,
        passwordRef.current?.value,
      );
    },
    [],
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
        />
        <Button
          el="button"
          type="submit"
          classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg font-bold"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
