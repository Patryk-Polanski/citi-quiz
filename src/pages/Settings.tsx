import { type ChangeEvent, useState, useCallback } from "react";
import Setting from "src/features/settings/Setting";
import SwatchRadio from "src/ui/form/SwatchRadio";
import TextRadio from "src/ui/form/TextRadio";

const FONT_SIZES = [
  {
    id: "small",
    value: "small",
  },
  {
    id: "medium",
    value: "medium",
  },
  {
    id: "large",
    value: "large",
  },
];

const BACKGROUNDS = [
  {
    id: "bg-sky-600",
    value: "bg-sky-600",
  },
  {
    id: "bg-orange-600",
    value: "bg-orange-600",
  },
  {
    id: "bg-green-600",
    value: "bg-green-600",
  },
  {
    id: "bg-red-600",
    value: "bg-red-600",
  },
];

export default function SettingsPage() {
  const [fontSize, setFontSize] = useState("medium");
  const [background, setBackground] = useState("bg-sky-600");

  const handleFontSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFontSize(e.target.value);
    },
    [],
  );

  const handleBackgroundChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBackground(e.target.value);
    },
    [],
  );

  return (
    <section>
      <h2 className="mb-6 mt-6 text-center">Settings</h2>
      <small className="block text-center">
        Changes are saved automatically
      </small>
      <div className="mt-14 flex flex-col gap-12">
        <Setting title="Font size">
          <div className="flex gap-6">
            {FONT_SIZES.map((size) => (
              <TextRadio
                key={size.id}
                id={size.id}
                name="font-size"
                value={size.value}
                fontSize={fontSize}
                onChange={handleFontSizeChange}
              />
            ))}
          </div>
        </Setting>
        <Setting title="Background">
          <div className="flex gap-6">
            {BACKGROUNDS.map((color) => (
              <SwatchRadio
                key={color.id}
                id={color.id}
                name="background"
                value={color.value}
                swatchClass={`before:${color.value}`}
                background={background}
                onChange={handleBackgroundChange}
              />
            ))}
          </div>
        </Setting>
        <Setting title="Reset app*" subtitle="*This will delete all data">
          <p>Data</p>
        </Setting>
      </div>
    </section>
  );
}
