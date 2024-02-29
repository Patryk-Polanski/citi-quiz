import { Link } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./icons/_Icon";

import { IconNames } from "../types/enums";

const icons = Object.values(IconNames);

export default function AppHeader() {
  console.log("🚀 ~ icons:", icons);

  return (
    <header className="mx-auto grid w-full max-w-[2000px] grid-cols-6 px-4 py-4">
      <Icon className="w-16" iconName={IconNames.Help} />
      <Link to="/" className="col-span-4 justify-self-center">
        <Logo />
      </Link>
      <Icon className="w-16 justify-self-end" iconName={IconNames.Account} />
    </header>
  );
}
