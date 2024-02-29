import { Link } from "react-router-dom";
import { type MenuCardTypes } from "../../types/cards";
import Icon, { IconNames } from "../../ui/Icons/_Icon";

type MenuCardProps = {
  menuItem: MenuCardTypes;
};

export default function MenuCard({ menuItem }: MenuCardProps) {
  return (
    <Link
      to={menuItem.link}
      className="relative z-10 block w-full overflow-hidden rounded-[40px] bg-gradient-to-br from-white/50 to-white/5 pb-2 pt-7 drop-shadow-xl backdrop-blur transition duration-0 after:absolute after:inset-0 after:rounded-[40px] after:border-2 after:border-white/20 after:transition after:duration-200 hover:-translate-y-[2px] hover:after:border-white/60"
    >
      <div className="z-10 mb-2 flex items-center">
        <Icon
          iconName={menuItem.icon}
          className="absolute left-0 top-0 w-[76px] -translate-x-3 -translate-y-3 opacity-50"
        />
        <h3 className="ml-12 mr-auto pb-3 pt-5 font-laila text-2xl">
          {menuItem.title}
        </h3>
        <span className="w-[2px] self-stretch bg-white opacity-60" />
        <Icon iconName={IconNames.Chevron} className="mx-2 h-6" />
      </div>
      <p className="text-center text-sm tracking-wide">{menuItem.subtitle}</p>
    </Link>
  );
}
