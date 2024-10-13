import { useMemo } from "react";
import { motion as m } from "framer-motion";

import { useAppSelector } from "src/hooks/useStore";
import { BlobGradients, IconNames } from "src/types/enums";
import useQuizzes from "src/hooks/useQuizzes";

import { type MenuCardTypes } from "src/types/cards";
import MenuCard from "./MenuCard";
import { blobAnim, genericAnimProps } from "src/utils/motion/shared/animations";
import {
  genericCardAnim,
  genericCardsAnim,
} from "src/utils/motion/cards/animations";

export default function Menu() {
  const { data: quizzesData } = useQuizzes();
  const { tryAgainQuestionIds, survivalQuizHighestScore } = useAppSelector(
    (store) => store.stats,
  );
  const menuCardsData: MenuCardTypes[] = useMemo(
    () => [
      {
        title: "All tests",
        subtitle: quizzesData.length + " quizzes",
        link: "/quizzes",
        blobColor: BlobGradients.Green,
        icon: IconNames.Rocket,
      },
      {
        title: "Survival",
        subtitle: "Highest score: " + survivalQuizHighestScore,
        link: "/quiz/survival",
        blobColor: BlobGradients.Amber,
        icon: IconNames.Target,
      },
      {
        title: "Try again",
        subtitle: `${tryAgainQuestionIds.length > 0 ? tryAgainQuestionIds.length : 0} ${tryAgainQuestionIds.length === 1 ? "question" : "questions"}`,
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
    ],
    [tryAgainQuestionIds, survivalQuizHighestScore, quizzesData.length],
  );

  return (
    <m.ul
      className="grid w-full grid-cols-1 items-center gap-3 sm:grid-cols-2 sm:gap-5"
      {...genericAnimProps}
      variants={genericCardsAnim}
    >
      {menuCardsData.map((menuItem, index) => (
        <li key={menuItem.link} className="relative">
          <m.span
            {...genericAnimProps}
            variants={blobAnim}
            className={`absolute bg-gradient-radial ${index % 2 === 0 ? "-right-8" : "-left-8"} pointer-events-none top-1/2 h-60 w-60 -translate-y-1/2 rounded-full ${menuItem.blobColor} blur-lg`}
          />
          <m.div variants={genericCardAnim}>
            <MenuCard menuItem={menuItem} />
          </m.div>
        </li>
      ))}
    </m.ul>
  );
}
