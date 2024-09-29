import { motion as m } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAppSelector } from "src/hooks/useStore";
import { AccountWindows, AnimDirection, IconNames } from "src/types/enums";

import Icon from "src/ui/icons/Icon";
import Button from "src/ui/Button";
import {
  genericAnimProps,
  opacityAnim,
  slideAnim,
} from "src/utils/motion/shared/animations";
import Signup from "src/features/authentication/Signup";
import Login from "src/features/authentication/Login";
import Logout from "src/features/authentication/Logout";
import useLogout from "src/hooks/useLogout";

const commonTabClasses =
  "w-[48%] text-slate-700 font-semibold after:border-t-white/0 hover:after:border-t-white/0";

const accountModalStyles = {
  maxHeight: "calc(100vh - 48px)",
  paddingBottom: "24px",
  paddingTop: "24px",
};

type AccountProps = {
  onClose: () => void;
};

export default function Account({ onClose }: AccountProps) {
  const { user } = useAppSelector((store) => store.auth);
  const { logoutUser, isLoggingUserOut } = useLogout();
  const [windowState, setWindowState] = useState<AccountWindows>(
    AccountWindows.Login,
  );
  const { background } = useAppSelector((store) => store.settings);

  const activeTabClasses = useMemo(
    () => `${background} text-white`,
    [background],
  );

  useEffect(() => {
    if (user !== null) setWindowState(AccountWindows.User);
  }, [user]);

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
      key="account-dialog"
      onClick={handleClose}
      className="fixed inset-0 z-40 flex items-center justify-center"
    >
      <m.div
        className="absolute inset-0 z-10 bg-white/60"
        variants={opacityAnim()}
        {...genericAnimProps}
      ></m.div>
      <m.div
        id="accountModal"
        style={accountModalStyles}
        className="hideScrollbars relative z-20 w-full max-w-[400px] overflow-y-scroll px-2"
        variants={slideAnim(AnimDirection.up)}
        onAnimationComplete={() => {
          if (!user) setWindowState(AccountWindows.Login);
        }}
        {...genericAnimProps}
      >
        <div
          className={`min-h-28 overflow-hidden rounded-tl-3xl rounded-tr-3xl border-2 border-white ${background} w-full text-white`}
        >
          <div className="min-h-28 w-full bg-gradient-to-br from-white/60 to-white/30 p-5 font-medium">
            <Button
              el="button"
              onClick={onClose}
              omitStyles
              classes="ml-auto block"
            >
              <Icon iconName={IconNames.Close} className="h-6 w-6" />
            </Button>
            {user && windowState === AccountWindows.User ? (
              <Logout />
            ) : windowState === AccountWindows.Login ? (
              <Login closePopup={onClose} />
            ) : windowState === AccountWindows.Signup ? (
              <Signup closePopup={onClose} />
            ) : null}
          </div>
        </div>
        <div className="flex justify-between">
          {user && windowState === AccountWindows.User ? (
            <>
              <Button
                el="button"
                classes={`rounded-tl-none rounded-tr-none after:rounded-tl-none after:rounded-tr-none after:border-white hover:after:border-white ${commonTabClasses}`}
                onClick={onClose}
                disabled={isLoggingUserOut}
                isLoading={isLoggingUserOut}
              >
                No
              </Button>
              <Button
                el="button"
                classes={`rounded-tl-none rounded-tr-none after:rounded-tl-none after:rounded-tr-none after:border-white hover:after:border-white ${commonTabClasses}`}
                onClick={() => {
                  logoutUser();
                  onClose();
                }}
                disabled={isLoggingUserOut}
                isLoading={isLoggingUserOut}
              >
                Yes
              </Button>
            </>
          ) : (
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
          )}
        </div>
      </m.div>
    </div>
  );
}
