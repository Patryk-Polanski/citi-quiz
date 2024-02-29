import { type MenuCardTypes } from "../../types/cards";
import { IconNames } from "../../types/enums";

import MenuCard from "./MenuCard";

const menuCardsData: MenuCardTypes[] = [
  {
    title: "All tests",
    subtitle: "24 quizzes",
    link: "/quizzes",
    blobColor: "from-green-600/40 via-green-600/20 to-green-600/0",
    icon: IconNames.Rocket,
  },
  {
    title: "Survival",
    subtitle: "Highest score: 27",
    link: "/quiz/survival",
    blobColor: "from-amber-600/40 via-amber-600/20 to-amber-600/0",
    icon: IconNames.Target,
  },
  {
    title: "Try again",
    subtitle: "11 questions",
    link: "/quiz/try-again",
    blobColor: "from-sky-500/40 via-sky-500/20  to-sky-500/40",
    icon: IconNames.Medal,
  },
  {
    title: "Resources",
    subtitle: "Best learning resources",
    link: "/resources",
    blobColor: "from-red-500/40 via-red-500/20 to-red-500/0",
    icon: IconNames.Book,
  },
  {
    title: "Settings",
    subtitle: "Change font size & colours",
    link: "/settings",
    blobColor: "from-yellow-500/40 via-yellow-500/20 to-yellow-500/0",
    icon: IconNames.Settings,
  },
  {
    title: "FAQs",
    subtitle: "Frequently asked questions",
    link: "/faqs",
    blobColor: "from-fuchsia-600/40 via-fuchsia-600/20 to-fuchsia-600/0",
    icon: IconNames.Question,
  },
];

export default function Menu() {
  return (
    <ul className="grid w-full grid-cols-2 items-center gap-5">
      {menuCardsData.map((menuItem, index) => (
        <li key={menuItem.link} className="relative">
          <span
            className={`bg-gradient-radial absolute ${index % 2 === 0 ? "-right-8" : "-left-8"} top-1/2 h-60 w-60 -translate-y-1/2 rounded-full ${menuItem.blobColor} blur-lg`}
          />
          <MenuCard menuItem={menuItem} />
        </li>
      ))}
    </ul>
  );
}
