import { type ReactNode } from "react";

import Phone from "./Phone";
import Account from "./Account";
import Home from "./Home";
import Help from "./Help";
import Cross from "./Cross";
import Tick from "./Tick";
import Restart from "./Restart";
import Chevron from "./Chevron";
import Rocket from "./Rocket";
import Target from "./Target";
import Medal from "./Medal";
import Book from "./Book";
import Settings from "./Settings";
import Timer from "./Timer";
import LockClosed from "./LockClosed";
import LockOpen from "./LockOpen";
import Question from "./Question";

export enum IconNames {
  Phone = "phone",
  Help = "help",
  Account = "account",
  Home = "home",
  Cross = "cross",
  Tick = "tick",
  Restart = "restart",
  Chevron = "chevron",
  Rocket = "rocket",
  Target = "target",
  Medal = "medal",
  Book = "book",
  Question = "question",
  Settings = "settings",
  Timer = "timer",
  LockClosed = "lock-closed",
  LockOpen = "lock-open",
}

type IconProps = {
  iconName: IconNames;
  className?: string;
};

export default function Icon({ iconName, className }: IconProps) {
  let chosenIcon: ReactNode;

  switch (iconName) {
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

    case IconNames.Rocket:
      chosenIcon = <Rocket className={className} />;
      break;

    case IconNames.Target:
      chosenIcon = <Target className={className} />;
      break;

    case IconNames.Medal:
      chosenIcon = <Medal className={className} />;
      break;

    case IconNames.Book:
      chosenIcon = <Book className={className} />;
      break;

    case IconNames.Settings:
      chosenIcon = <Settings className={className} />;
      break;

    case IconNames.Timer:
      chosenIcon = <Timer className={className} />;
      break;

    case IconNames.LockClosed:
      chosenIcon = <LockClosed className={className} />;
      break;

    case IconNames.LockOpen:
      chosenIcon = <LockOpen className={className} />;
      break;

    case IconNames.Home:
      chosenIcon = <Home className={className} />;
      break;

    case IconNames.Question:
      chosenIcon = <Question className={className} />;
      break;

    default:
      break;
  }

  return chosenIcon;
}
