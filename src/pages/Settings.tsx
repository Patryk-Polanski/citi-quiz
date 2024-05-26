import { type ChangeEvent, useState, useCallback } from "react";
import Setting from "src/features/settings/Setting";
import SwatchRadio from "src/ui/form/SwatchRadio";
import TextRadio from "src/ui/form/TextRadio";

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
            <TextRadio
              id="small"
              name="font-size"
              value="small"
              fontSize={fontSize}
              onChange={handleFontSizeChange}
            />
            <TextRadio
              id="medium"
              name="font-size"
              value="medium"
              fontSize={fontSize}
              onChange={handleFontSizeChange}
            />
            <TextRadio
              id="large"
              name="font-size"
              value="large"
              fontSize={fontSize}
              onChange={handleFontSizeChange}
            />
          </div>
        </Setting>
        <Setting title="Background">
          <div className="flex gap-6">
            <SwatchRadio
              id="bg-sky-600"
              name="background"
              value="bg-sky-600"
              swatchClass="before:bg-sky-600"
              background={background}
              onChange={handleBackgroundChange}
            />
            <SwatchRadio
              id="bg-orange"
              name="background"
              value="bg-orange"
              swatchClass="before:bg-orange-600"
              background={background}
              onChange={handleBackgroundChange}
            />
            <SwatchRadio
              id="bg-green-600"
              name="background"
              value="bg-green-600"
              swatchClass="before:bg-green-600"
              background={background}
              onChange={handleBackgroundChange}
            />
            <SwatchRadio
              id="bg-red-600"
              name="background"
              value="bg-red-600"
              swatchClass="before:bg-red-600"
              background={background}
              onChange={handleBackgroundChange}
            />
          </div>
        </Setting>
        <Setting title="Reset app*" subtitle="*This will delete all data">
          <p>Data</p>
        </Setting>
      </div>
    </section>
  );
}
