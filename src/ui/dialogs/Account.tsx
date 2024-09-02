import { motion as m } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAppSelector } from "src/hooks/useStore";
import { AnimDirection, IconNames } from "src/types/enums";

import Icon from "src/ui/icons/Icon";
import Button from "src/ui/Button";
import {
  genericAnimProps,
  slideAnim,
} from "src/utils/motion/shared/animations";
import Signup from "src/features/authentication/Signup";
import Login from "src/features/authentication/Login";
import Logout from "src/features/authentication/Logout";

const commonTabClasses =
  "w-[48%] text-slate-700 font-semibold after:border-t-white/0 hover:after:border-t-white/0";

enum AccountWindows {
  Login = "login",
  Signup = "signup",
  User = "user",
}

type AccountProps = {
  onClose: () => void;
};

export default function Account({ onClose }: AccountProps) {
  const [windowState, setWindowState] = useState<AccountWindows>(
    AccountWindows.Login,
  );
  const { background } = useAppSelector((store) => store.settings);

  const activeTabClasses = useMemo(
    () => `${background} text-white`,
    [background],
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
    <m.div
      key="account-dialog"
      onClick={handleClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/60"
      {...genericAnimProps}
      variants={slideAnim(AnimDirection.up)}
    >
      <div id="accountModal" className="-translate-y-16">
        <div
          className={`min-h-28 overflow-hidden rounded-tl-3xl rounded-tr-3xl border-2 border-white ${background} text-white sm:min-w-96`}
        >
          <div className="min-h-28 bg-gradient-to-br from-white/60 to-white/30 p-5 font-medium sm:min-w-96">
            <Button
              el="button"
              onClick={onClose}
              omitStyles
              classes="ml-auto block"
            >
              <Icon iconName={IconNames.Close} className="h-6 w-6" />
            </Button>
            {windowState === AccountWindows.Login && <Login />}
            {windowState === AccountWindows.Signup && <Signup />}
            {windowState === AccountWindows.User && <Logout />}
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
                classes={`rounded-tl-none rounded-tr-none after:rounded-tl-none after:rounded-tr-none after:border-white hover:after:border-white ${commonTabClasses} ${windowState === AccountWindows.Signup && activeTabClasses}`}
                onClick={() => setWindowState(AccountWindows.Signup)}
              >
                Sign up
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
    </m.div>
  );
}
