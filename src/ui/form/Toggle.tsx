type ToggleProps = {
  id: string;
  name: string;
  value: string;
  isClearDataAllowed: boolean;
  onChange: () => void;
};

export default function Toggle({
  id,
  name,
  value,
  isClearDataAllowed,
  onChange,
}: ToggleProps) {
  return (
    <div
      className={`relative ${!isClearDataAllowed && "pointer-events-none opacity-50"}`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="peer pointer-events-none absolute left-0 top-0 opacity-0"
      />
      <label
        htmlFor={id}
        className="relative inline-block h-8 w-20 cursor-pointer leading-none transition-transform ease-out before:inline-block before:h-full before:w-full before:rounded-full before:bg-sky-200 before:content-[''] after:absolute after:left-1 after:top-1/2 after:inline-block after:h-6 after:w-6 after:-translate-y-1/2 after:rounded-full after:bg-sky-600 after:duration-500 after:content-[''] peer-checked:after:translate-x-12"
      ></label>
    </div>
  );
}
