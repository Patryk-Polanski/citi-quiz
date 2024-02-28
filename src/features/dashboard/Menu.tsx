import MenuCard from "./MenuCard";

const menuCardsData = [
  {
    title: "All tests",
    link: "/quizzes",
    blobClasses: "bg-red-500 right-0",
  },
  {
    title: "Survival",
    link: "/quiz/survival",
    blobClasses: "bg-red-500",
  },
  {
    title: "Try again",
    link: "/quiz/try-again",
    blobClasses: "bg-red-500 right-0",
  },
  {
    title: "Resources",
    link: "/resources",
    blobClasses: "bg-red-500",
  },
  {
    title: "Settings",
    link: "/settings",
    blobClasses: "bg-red-500 right-0",
  },
  {
    title: "FAQs",
    link: "/faqs",
    blobClasses: "bg-red-500",
  },
];

export default function Menu() {
  return (
    <ul className="grid grid-cols-2 gap-5">
      {menuCardsData.map((menuItem) => (
        <li key={menuItem.link}>
          <MenuCard link={menuItem.link} blobClasses={menuItem.blobClasses}>
            <h3 className="text-2xl">{menuItem.title}</h3>
          </MenuCard>
        </li>
      ))}
    </ul>
  );
}
