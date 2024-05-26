import { ChangeEvent } from "react";

type TextRadioType = {
  id: string;
  name: string;
  value: string;
  text?: string;
  fontSize: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextRadio({
  id,
  name,
  value,
  text,
  fontSize,
  onChange,
}: TextRadioType) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        value={text ? text : value}
        onChange={onChange}
        checked={fontSize === value}
        className="pointer-events-none absolute opacity-0"
      />
      <label
        htmlFor={id}
        className={`relative cursor-pointer ${fontSize === value && `after:absolute after:-top-8 after:left-1/2 after:-translate-x-1/2 after:text-lg after:font-bold after:content-['⌄']`}`}
      >
        {text ? text : value}
      </label>
    </div>
  );
}
