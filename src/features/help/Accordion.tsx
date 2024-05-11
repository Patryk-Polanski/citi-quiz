import { useCallback, useMemo, useState } from "react";
import { IconNames } from "src/types/enums";
import { faq } from "src/types/help";
import Icon from "src/ui/Icons/Icon";
import Button from "src/ui/Button";

type AccordionProps = {
  faq: faq;
};

export default function Accordion({
  faq: { question, answer, id },
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const answerStyles = useMemo(() => {
    return {
      display: "grid",
      transition: "grid-template-rows 500ms",
      gridTemplateRows: !isOpen ? "0fr" : "1fr",
    };
  }, [isOpen]);

  return (
    <div className="relative z-10 mb-4">
      <Button
        el="button"
        aria-controls={`accordion-${id}`}
        classes={`w-full justify-between items-center px-6 ${!isOpen ? "after:border-white/20" : "after:border-white/60"}`}
        id={`accordion-button-${id}`}
        aria-expanded={!isOpen ? "false" : "true"}
        onClick={toggleOpen}
      >
        <p className="font-bold">{question}</p>
        <Icon
          iconName={IconNames.Chevron}
          className={`h-[18px] w-[18px] ${!isOpen ? "rotate-90" : "-rotate-90"} transition-transform duration-200 ease-out`}
        />
      </Button>
      <div
        style={answerStyles}
        id={`accordion-${id}`}
        aria-labelledby={`accordion-button-${id}`}
      >
        <div className="overflow-hidden">
          <p className="p-4">{answer}</p>
        </div>
      </div>
    </div>
  );
}
