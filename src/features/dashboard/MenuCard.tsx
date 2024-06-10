import { Link } from "react-router-dom";
import { type MenuCardTypes } from "src/types/cards";
import Icon from "src/ui/Icons/Icon";
import { IconNames } from "src/types/enums";

type MenuCardProps = {
  menuItem: MenuCardTypes;
};

export default function MenuCard({ menuItem }: MenuCardProps) {
  return (
    <Link
      to={menuItem.link}
      className="group relative z-10 block w-full overflow-hidden rounded-[40px] bg-gradient-to-br from-white/50 to-white/5 pb-2 pt-5 drop-shadow-xl backdrop-blur transition duration-0 ease-in-out after:absolute after:inset-0 after:rounded-[40px] after:border-2 after:border-white/20 after:transition after:duration-0 hover:after:border-white/60 md:pt-7"
    >
      <div className="z-10 mb-1 flex items-center md:mb-2">
        <Icon
          iconName={menuItem.icon}
          className="absolute left-0 top-0 w-14 -translate-x-3 -translate-y-3 opacity-50 transition duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-[10%] group-hover:scale-50 group-hover:opacity-80 md:w-[76px] md:group-hover:translate-y-[22%]"
        />
        <h3 className="ml-12 mr-auto pb-3 pt-5 transition duration-200 ease-in-out group-hover:translate-x-1 md:group-hover:translate-x-4">
          {menuItem.title}
        </h3>
        <span className="w-[2px] self-stretch bg-white opacity-60" />
        <Icon iconName={IconNames.Chevron} className="mx-2 h-6" />
      </div>
      <p className="text-center text-[13px] tracking-wide md:text-sm">
        {menuItem.subtitle}
      </p>
    </Link>
  );
}
