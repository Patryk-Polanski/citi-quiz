import { type ChangeEvent, useState } from "react";
import Setting from "src/features/settings/Setting";
import TextRadio from "src/ui/form/TextRadio";

export default function SettingsPage() {
  const [fontSize, setFontSize] = useState("medium");

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFontSize(e.target.value);
  };

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
          <p>Background</p>
        </Setting>
        <Setting title="Reset app*" subtitle="*This will delete all data">
          <p>Data</p>
        </Setting>
      </div>
    </section>
  );
}
