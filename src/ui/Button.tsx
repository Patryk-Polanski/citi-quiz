import { type ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  el: "button";
  className?: string;
} & ComponentPropsWithoutRef<"button">;

type LinkProps = {
  el: "link";
  href: string;
  className?: string;
} & ComponentPropsWithoutRef<"a">;

export default function Button(props: ButtonProps | LinkProps) {
  const defaultClasses =
    "flex items-center justify-items-center gap-4 rounded-[20px] bg-gradient-to-br from-white/50 to-white/5 px-4 py-[18px] drop-shadow-xl backdrop-blur transition duration-0 ease-in-out after:absolute after:inset-0 after:rounded-[20px] after:border-2 after:border-white/20 after:transition after:duration-0 hover:after:border-white/60";

  if (props.el === "link")
    return (
      <Link
        className={`${defaultClasses} ${props.className}`}
        to={props.href}
        {...props}
      ></Link>
    );

  return (
    <button className={`${defaultClasses} ${props.className}`} {...props}>
      Button
    </button>
  );
}
