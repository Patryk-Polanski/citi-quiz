import { useState } from "react";
import { createPortal } from "react-dom";
import { IconNames } from "src/types/enums";

import useCreateQuiz from "src/hooks/useCreateQuiz";

import Button from "src/ui/Button";
import Icon from "src/ui/icons/Icon";
import Help from "src/ui/sliders/Help";

export default function AppFooter() {
  const [isHelpSliderOpen, setIsHelpSliderOpen] = useState(false);
  const { createQuiz, isCreatingQuiz } = useCreateQuiz();

  return (
    <>
      <Button el="button" omitStyles onClick={() => setIsHelpSliderOpen(true)}>
        <Icon
          className="mx-4 mt-16 h-auto w-14 md:hidden md:w-16"
          iconName={IconNames.Help}
        />
      </Button>
      <footer className="p-3 text-center md:mt-20">
        <small className="text-sm">
          © Built and maintained by{" "}
          <Button
            el="link"
            href="https://www.linkedin.com/in/patryk-polanski/"
            omitStyles
            classes="inline underline"
            target="_blank"
          >
            Patryk Polanski.
          </Button>
        </small>
      </footer>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        <Button el="button" onClick={() => createQuiz()}>
          {!isCreatingQuiz ? "Add Quiz" : "Loading"}
        </Button>
      </div>
      {createPortal(
        isHelpSliderOpen ? (
          <Help onClose={() => setIsHelpSliderOpen(false)} />
        ) : null,
        document.getElementById("portal-root")!,
      )}
    </>
  );
}
