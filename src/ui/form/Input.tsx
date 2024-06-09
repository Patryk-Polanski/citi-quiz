import { type RefObject } from "react";

type InputType = {
  id: string;
  name: string;
  label: string;
  inputRef: RefObject<HTMLInputElement>;
  minLength?: number;
  maxLength?: number;
  type?: string;
};

export default function Input({
  id,
  name,
  label,
  minLength,
  maxLength,
  type,
  inputRef,
}: InputType) {
  return (
    <div className="flex flex-col gap-1 px-10">
      <label className="text-left text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className="max-w-96 rounded px-2 py-1 text-sm text-black"
        ref={inputRef}
        type={type ? type : "text"}
        id={id}
        name={name}
        required
        minLength={minLength ? minLength : 2}
        maxLength={maxLength ? maxLength : 12}
      />
    </div>
  );
}
