import Icon, { IconNames } from "../../ui/Icons/_Icon";
import MenuCard from "./MenuCard";

const menuCardsData = [
  {
    title: "All tests",
    subtitle: "24 quizzes",
    link: "/quizzes",
    blobClasses: "bg-red-500 right-0",
    icon: IconNames.Rocket,
  },
  {
    title: "Survival",
    subtitle: "Highest score: 27",
    link: "/quiz/survival",
    blobClasses: "bg-red-500",
    icon: IconNames.Target,
  },
  {
    title: "Try again",
    subtitle: "11 questions",
    link: "/quiz/try-again",
    blobClasses: "bg-red-500 right-0",
    icon: IconNames.Medal,
  },
  {
    title: "Resources",
    subtitle: "Best learning resources",
    link: "/resources",
    blobClasses: "bg-red-500",
    icon: IconNames.Book,
  },
  {
    title: "Settings",
    subtitle: "Change font size & colours",
    link: "/settings",
    blobClasses: "bg-red-500 right-0",
    icon: IconNames.Settings,
  },
  {
    title: "FAQs",
    subtitle: "Frequently asked questions",
    link: "/faqs",
    blobClasses: "bg-red-500",
    icon: IconNames.Question,
  },
];

export default function Menu() {
  return (
    <ul className="grid w-full grid-cols-2 items-center gap-5">
      {menuCardsData.map((menuItem) => (
        <li key={menuItem.link}>
          <MenuCard link={menuItem.link} blobClasses={menuItem.blobClasses}>
            <div className="z-10 mb-2 flex items-center">
              <Icon
                iconName={menuItem.icon}
                className="absolute left-0 top-0 -translate-x-3 -translate-y-3 opacity-50"
              />
              <h3 className="ml-12 mr-auto pb-3 pt-5 font-laila text-2xl">
                {menuItem.title}
              </h3>
              <span className="w-[2px] self-stretch bg-white opacity-60" />
              <Icon iconName={IconNames.Chevron} className="mx-2 h-6" />
            </div>
            <p className="text-center text-sm tracking-wide">
              {menuItem.subtitle}
            </p>
          </MenuCard>
        </li>
      ))}
    </ul>
  );
}
