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
    <Link to={link} className="relative">
      <span className={`absolute h-5 w-5 rounded-full ${blobClasses}`} />
      {children}
    </Link>
  );
}
