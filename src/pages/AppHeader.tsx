import { createPortal } from "react-dom";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppSelector } from "src/hooks/useStore";
import { IconNames } from "../types/enums";
import Help from "src/ui/sliders/Help";

import Logo from "src/ui/Logo";
import Icon from "src/ui/icons/Icon";
import Button from "src/ui/Button";
import Account from "src/ui/dialogs/Account";
import { AnimatePresence } from "framer-motion";

const urlswithBackBtn = ["/quizzes", "/settings", "/resources", "/faqs"];

export default function AppHeader() {
  const { user } = useAppSelector((store) => store.auth);
  const [isHelpSliderOpen, setIsHelpSliderOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <header className="mx-auto grid w-full max-w-[2000px] grid-cols-8 px-4 py-4">
        <div className="col-span-2">
          <div className="flex items-center md:gap-4">
            <Button
              el="button"
              omitStyles
              onClick={() => setIsHelpSliderOpen(true)}
            >
              <Icon
                className="hidden h-auto w-14 md:block md:w-16"
                iconName={IconNames.Help}
              />
            </Button>
            {urlswithBackBtn.includes(pathname) ? (
              <Button el="link" href="/">
                <Icon
                  iconName={IconNames.Chevron}
                  className="hidden h-[18px] w-[18px] rotate-180 sm:block"
                />
                <span className="hidden w-[2px] self-stretch bg-white opacity-60 sm:block" />
                <Icon iconName={IconNames.Home} className="h-5 w-5" />
              </Button>
            ) : null}
          </div>
        </div>
        <Link to="/" className="col-span-4 justify-self-center">
          <Logo />
        </Link>
        <Button
          el="button"
          omitStyles
          classes="col-span-2 justify-self-end self-start flex flex-col-reverse sm:flex-row items-center gap-3"
          onClick={() => setIsAccountModalOpen(true)}
        >
          {user?.displayName && <p>{user?.displayName}</p>}
          <Icon className="h-auto w-14 md:w-16" iconName={IconNames.Account} />
        </Button>
      </header>
      {createPortal(
        <AnimatePresence>
          {isHelpSliderOpen ? (
            <Help onClose={() => setIsHelpSliderOpen(false)} />
          ) : null}
        </AnimatePresence>,
        document.getElementById("portal-root")!,
      )}
      {createPortal(
        <AnimatePresence>
          {isAccountModalOpen ? (
            <Account onClose={() => setIsAccountModalOpen(false)} />
          ) : null}
        </AnimatePresence>,
        document.getElementById("portal-root")!,
      )}
    </>
  );
}
