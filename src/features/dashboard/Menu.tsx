import { BlobGradients, IconNames } from "src/types/enums";

import { TEMP_DATA } from "src/utils/constants";

import { type MenuCardTypes } from "src/types/cards";
import MenuCard from "./MenuCard";

const menuCardsData: MenuCardTypes[] = [
  {
    title: "All tests",
    subtitle: TEMP_DATA.length + " quizzes",
    link: "/quizzes",
    blobColor: BlobGradients.Green,
    icon: IconNames.Rocket,
  },
  {
    title: "Survival",
    subtitle: "Highest score: 27",
    link: "/quiz/survival",
    blobColor: BlobGradients.Amber,
    icon: IconNames.Target,
  },
  {
    title: "Try again",
    subtitle: "11 questions",
    link: "/quiz/try-again",
    blobColor: BlobGradients.Sky,
    icon: IconNames.Medal,
  },
  {
    title: "Resources",
    subtitle: "Best learning resources",
    link: "/resources",
    blobColor: BlobGradients.Red,
    icon: IconNames.Book,
  },
  {
    title: "Settings",
    subtitle: "Change font size & colours",
    link: "/settings",
    blobColor: BlobGradients.Yellow,
    icon: IconNames.Settings,
  },
  {
    title: "FAQs",
    subtitle: "Frequently asked questions",
    link: "/faqs",
    blobColor: BlobGradients.Fuchsia,
    icon: IconNames.Question,
  },
];

export default function Menu() {
  return (
    <ul className="grid w-full grid-cols-2 items-center gap-5">
      {menuCardsData.map((menuItem, index) => (
        <li key={menuItem.link} className="relative">
          <span
            className={`absolute bg-gradient-radial ${index % 2 === 0 ? "-right-8" : "-left-8"} top-1/2 h-60 w-60 -translate-y-1/2 rounded-full ${menuItem.blobColor} blur-lg`}
          />
          <MenuCard menuItem={menuItem} />
        </li>
      ))}
    </ul>
  );
}
