import { Link, useLocation } from "react-router-dom";
import Logo from "src/ui/Logo";
import Icon from "src/ui/Icons/Icon";
import Button from "src/ui/Button";

import { IconNames } from "../types/enums";

const urlswithBackBtn = ["/quizzes", "/settings", "/resources", "/faqs"];

export default function AppHeader() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header className="mx-auto grid w-full max-w-[2000px] grid-cols-8 px-4 py-4">
      <div className="col-span-2">
        <div className="flex items-center gap-4">
          <Icon className="w-16" iconName={IconNames.Help} />
          {urlswithBackBtn.includes(pathname) ? (
            <Button el="link" href="/">
              <Icon
                iconName={IconNames.Chevron}
                className="h-[18px] w-[18px] rotate-180"
              />
              <span className="w-[2px] self-stretch bg-white opacity-60" />
              <Icon iconName={IconNames.Home} className="h-5 w-5" />
            </Button>
          ) : null}
        </div>
      </div>
      <Link to="/" className="col-span-4 justify-self-center">
        <Logo />
      </Link>
      <Icon
        className="col-span-2 w-16 justify-self-end"
        iconName={IconNames.Account}
      />
    </header>
  );
}
