import { Link } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./Icons/_Icon";

import { IconNames } from "./Icons/_Icon";

export default function AppHeader() {
  return (
    <header className="mx-auto grid max-w-[2000px] grid-cols-6 px-4 py-4">
      <Icon className="w-16" iconName={IconNames.Help} />
      <Link to="/" className="col-span-4 justify-self-center">
        <Logo />
      </Link>
      <Icon className="w-16 justify-self-end" iconName={IconNames.Account} />
    </header>
  );
}
