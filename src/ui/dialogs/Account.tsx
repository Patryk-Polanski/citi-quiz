import Button from "src/ui/Button";
import Icon from "src/ui/Icons/Icon";
import { IconNames } from "src/types/enums";
import { useCallback, useEffect, useState } from "react";
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

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/50"
    >
      <div id="accountModal" className="-translate-y-16">
        <div className="min-h-28 min-w-96 overflow-hidden rounded-tl-3xl rounded-tr-3xl border-2 border-white bg-sky-700 text-white">
          <div className="min-h-28 min-w-96 bg-gradient-to-br from-white/60 to-white/30 p-5 font-medium">
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
                  Log in to save your quizzes data
                </h5>
                <form>
                  <Input />
                  <Input />
                </form>
              </div>
            )}
            {windowState === AccountWindows.Register && (
              <div className="text-center">
                <h5 className="mt-2 text-center">Create an account</h5>
                <form>
                  <Input />
                  <Input />
                  <Input />
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
