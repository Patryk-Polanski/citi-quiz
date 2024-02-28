import { type ReactNode } from "react";
import { Link } from "react-router-dom";

type MenuCardProps = {
  children: ReactNode;
  link: string;
  blobClasses?: string;
};

export default function MenuCard({
  children,
  link,
  blobClasses,
}: MenuCardProps) {
  return (
    <Link
      to={link}
      className="relative z-10 block w-full overflow-hidden rounded-[40px] bg-gradient-to-br from-white/50 to-white/5 pb-2 pt-7 drop-shadow-xl backdrop-blur
      
      after:absolute after:inset-0 after:rounded-[40px] after:border-2 after:border-white/20
      "
    >
      <span className={`absolute -z-10 h-5 w-5 rounded-full ${blobClasses}`} />
      {children}
    </Link>
  );
}
