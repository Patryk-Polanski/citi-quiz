import { type ReactNode } from "react";

import Phone from "./Phone";
import Account from "./Account";
import Help from "./Help";
import Cross from "./Cross";
import Tick from "./Tick";
import Restart from "./Restart";
import Chevron from "./Chevron";

export enum IconNames {
  Phone = "phone",
  Help = "help",
  Account = "account",
  Cross = "cross",
  Tick = "tick",
  Restart = "restart",
  Chevron = "chevron",
}

type IconProps = {
  iconType: IconNames;
  className?: string;
};

export default function Icon({ iconType, className }: IconProps) {
  let chosenIcon: ReactNode;

  switch (iconType) {
    case IconNames.Phone:
      chosenIcon = <Phone className={className} />;
      break;

    case IconNames.Account:
      chosenIcon = <Account className={className} />;
      break;

    case IconNames.Help:
      chosenIcon = <Help className={className} />;
      break;

    case IconNames.Cross:
      chosenIcon = <Cross className={className} />;
      break;

    case IconNames.Tick:
      chosenIcon = <Tick className={className} />;
      break;

    case IconNames.Restart:
      chosenIcon = <Restart className={className} />;
      break;

    case IconNames.Chevron:
      chosenIcon = <Chevron className={className} />;
      break;

    default:
      break;
  }

  return chosenIcon;
}
