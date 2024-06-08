import { useEffect, useRef } from "react";

import { IconNames } from "src/types/enums";

import Button from "src/ui/Button";
import Icon from "src/ui/Icons/Icon";

type HelpProps = {
  onClose: () => void;
};

export default function Help({ onClose }: HelpProps) {
  const helpSliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target?.closest("#helpSlider")) {
        onClose();
        console.log("close!");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <div
      id="helpSlider"
      ref={helpSliderRef}
      className="fixed left-0 top-0 z-20 h-full w-full max-w-md border-r-2 bg-sky-700 text-white"
    >
      <div className="flex h-full flex-col bg-gradient-to-br from-white/50 to-white/30 p-6 font-medium">
        <Button
          el="button"
          onClick={onClose}
          omitStyles
          classes="ml-auto block"
        >
          <Icon iconName={IconNames.Close} className="h-6 w-6" />
        </Button>
        <div className="mt-4 flex h-full flex-col gap-4">
          <h3>Help</h3>
          <p>
            The Life in the UK test, required for British citizenship or
            permanent residency, assesses knowledge of British life, history,
            customs, and traditions through 24 multiple-choice questions. To
            pass, candidates must score at least 75% within 45 minutes. The test
            costs £50 and must be booked online, with identification and proof
            of address required on the test day. It is offered at various
            centers across the UK to ensure applicants understand British life
            and values for better societal integration.
          </p>
          <p>
            The app is a free, open-source tool to help applicants practice the
            tests, with questions and answers derived from the official sources.
          </p>
          <h3 className="mt-auto">Feedback</h3>
          <p>
            To leave feedback or find out more information, drop me a message on
            LinkedIn or my personal website:
            <br />
            <br />
            <Button
              el="link"
              className="underline"
              target="_blank"
              href="https://www.linkedin.com/in/patryk-polanski/"
            >
              https://www.linkedin.com/in/patryk-polanski/
            </Button>
            <Button
              el="link"
              className="underline"
              target="_blank"
              href="https://patryk-polanski.com/"
            >
              https://patryk-polanski.com/
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
