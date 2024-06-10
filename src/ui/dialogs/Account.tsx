import Button from "src/ui/Button";
import Icon from "src/ui/Icons/Icon";
import { IconNames } from "src/types/enums";
import { useCallback, useEffect, useRef, useState } from "react";
import Input from "../form/Input";

const commonTabClasses =
  "w-[48%] text-sky-700 font-semibold after:border-t-white/0 hover:after:border-t-white/0";

const activeTabClasses = "bg-sky-700 text-white";

enum AccountWindows {
  Login = "login",
  Register = "register",
  User = "user",
}

type AccountProps = {
  onClose: () => void;
};

export default function Account({ onClose }: AccountProps) {
  const [windowState, setWindowState] = useState<AccountWindows>(
    AccountWindows.Login,
  );
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#accountModal")) onClose();
    },
    [onClose],
  );

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

  const handleRegisterSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(
        "onRegisterSubmit",
        usernameRef.current?.value,
        passwordRef.current?.value,
        passwordConfirmationRef.current?.value,
      );
    },
    [],
  );

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/60"
    >
      <div id="accountModal" className="-translate-y-16">
        <div className="min-h-28 overflow-hidden rounded-tl-3xl rounded-tr-3xl border-2 border-white bg-sky-700 text-white sm:min-w-96">
          <div className="min-h-28 bg-gradient-to-br from-white/60 to-white/30 p-5 font-medium sm:min-w-96">
            <Button
              el="button"
              onClick={onClose}
              omitStyles
              classes="ml-auto block"
            >
              <Icon iconName={IconNames.Close} className="h-6 w-6" />
            </Button>
            {windowState === AccountWindows.Login && (
              <div className="text-center">
                <h5 className="mt-2 text-center">
                  Login to save your quizzes data
                </h5>
                <form
                  className="mb-2 mt-4 flex flex-col gap-2"
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
                    classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            )}
            {windowState === AccountWindows.Register && (
              <div className="text-center">
                <h5 className="mt-2 text-center">Create an account</h5>
                <form
                  className="mb-2 mt-4 flex flex-col gap-2"
                  onSubmit={handleRegisterSubmit}
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
                  <Input
                    id="conform-password"
                    label="Confirm password:"
                    name="conform-password"
                    type="password"
                    inputRef={passwordConfirmationRef}
                  />
                  <Button
                    el="button"
                    type="submit"
                    classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            )}
            {windowState === AccountWindows.User && (
              <div className="text-center">
                <h5 className="mt-2 text-center">Would you like to log out?</h5>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          {windowState !== AccountWindows.User ? (
            <>
              <Button
                el="button"
                classes={`rounded-tr-none rounded-tl-none after:rounded-tr-none after:rounded-tl-none after:border-white hover:after:border-white ${commonTabClasses} ${windowState === AccountWindows.Login && activeTabClasses}`}
                onClick={() => setWindowState(AccountWindows.Login)}
              >
                Login
              </Button>
              <Button
                el="button"
                classes={`rounded-tl-none rounded-tr-none after:rounded-tl-none after:rounded-tr-none after:border-white hover:after:border-white ${commonTabClasses} ${windowState === AccountWindows.Register && activeTabClasses}`}
                onClick={() => setWindowState(AccountWindows.Register)}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button
                el="button"
                classes={`rounded-tl-none rounded-tr-none after:rounded-tl-none after:rounded-tr-none after:border-white hover:after:border-white ${commonTabClasses}`}
                onClick={onClose}
              >
                No
              </Button>
              <Button
                el="button"
                classes={`rounded-tl-none rounded-tr-none after:rounded-tl-none after:rounded-tr-none after:border-white hover:after:border-white ${commonTabClasses}`}
                onClick={() => console.log("log user out")}
              >
                Yes
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
