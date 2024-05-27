import { type ChangeEvent, useState, useCallback, useRef } from "react";

import { useAppSelector } from "src/hooks/useStore";
import { useAppDispatch } from "src/hooks/useStore";
import { setFontSize, setBackground } from "src/store/settings-slice";

import Setting from "src/features/settings/Setting";
import LockClosed from "src/ui/Icons/LockClosed";
import LockOpen from "src/ui/Icons/LockOpen";
import SwatchRadio from "src/ui/form/SwatchRadio";
import TextRadio from "src/ui/form/TextRadio";
import Toggle from "src/ui/form/Toggle";

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
  const { fontSize, background } = useAppSelector((store) => store.settings);
  const dispatch = useAppDispatch();
  const [isClearDataAllowed, setIsClearDataAllowed] = useState(false);
  const [clearData, setClearData] = useState(false);
  const resetAppSubtitle = useRef("*This will delete all data");

  const handleFontSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setFontSize(e.target.value));
    },
    [dispatch],
  );

  const handleBackgroundChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setBackground(e.target.value));
    },
    [dispatch],
  );

  const handleEraseData = useCallback(() => {
    setClearData((prevVal) => !prevVal);
    resetAppSubtitle.current = "Application data has been reset";
    setIsClearDataAllowed(false);
  }, []);

  return (
    <section>
      <h2 className="mb-6 mt-6 text-center">Settings</h2>
      <small className="block text-center">
        Changes are saved automatically
      </small>
      <div className="mt-14 flex flex-col gap-16">
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
          <div className="flex gap-7">
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
        <Setting title="Reset app*" subtitle={resetAppSubtitle.current}>
          <div className="flex items-center gap-4 leading-none">
            <Toggle
              id="erase-data"
              name="erase-data"
              value="erase-data"
              isClearDataAllowed={isClearDataAllowed}
              onChange={handleEraseData}
            />
            {!isClearDataAllowed && (
              <div
                className={!clearData ? "cursor-pointer" : ""}
                onClick={() => !clearData && setIsClearDataAllowed(true)}
              >
                <LockClosed className="h-7 w-7" />
              </div>
            )}
            {isClearDataAllowed && (
              <div
                className={!clearData ? "cursor-pointer" : ""}
                onClick={() => !clearData && setIsClearDataAllowed(false)}
              >
                <LockOpen className="h-7 w-7" />
              </div>
            )}
          </div>
        </Setting>
      </div>
    </section>
  );
}
