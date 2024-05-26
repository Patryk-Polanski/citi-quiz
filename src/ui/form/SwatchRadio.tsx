import { ChangeEvent } from "react";

const afterStyles = `after:absolute after:-top-16 after:left-1/2 after:-translate-x-1/2 after:text-lg after:font-bold after:content-['⌄']`;

type SwitchRadioType = {
  id: string;
  name: string;
  value: string;
  text?: string;
  background: string;
  swatchClass: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SwatchRadio({
  id,
  name,
  value,
  text,
  background,
  swatchClass,
  onChange,
}: SwitchRadioType) {
  return (
    <div className="min-w-10">
      <input
        type="radio"
        id={id}
        name={name}
        value={text ? text : value}
        onChange={onChange}
        checked={background === value}
        className="pointer-events-none absolute opacity-0"
      />
      <label
        htmlFor={id}
        className={`relative cursor-pointer before:inline-block before:h-10 before:w-10 before:rounded-full before:border-2 before:content-[''] ${swatchClass} ${background === value && afterStyles}`}
      ></label>
    </div>
  );
}
