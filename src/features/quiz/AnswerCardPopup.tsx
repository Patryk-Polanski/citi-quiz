import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";

import { useAppSelector } from "src/hooks/useStore";

import { IconNames } from "src/types/enums";
import Icon from "src/ui/icons/Icon";
import { genericAnimProps, popAnim } from "src/utils/motion/shared/animations";

export default function AnswerCardPopup({ passed }: { passed: boolean }) {
  const { background } = useAppSelector((store) => store.settings);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return isMounted ? (
    <m.div
      className={`absolute -top-1/2 right-3 z-10 flex flex-col items-center justify-center gap-2 rounded-lg ${background.includes("bg-blue") ? "bg-blue-200 before:border-r-blue-200" : "bg-white before:border-r-white"} px-5 py-3
      before:absolute before:left-0 before:top-1/2 before:h-0 before:w-0 before:-translate-x-full before:rotate-0  before:border-b-[5px] before:border-r-[30px] before:border-t-[5px] before:border-solid before:border-transparent`}
      {...genericAnimProps}
      variants={popAnim}
    >
      <Icon
        iconName={passed ? IconNames.Tick : IconNames.Cross}
        className="h-10 w-10"
      />
      <small className={`${passed ? "text-green-600" : "text-red-600"}`}>
        {passed ? "Correct" : "Wrong"}
      </small>
    </m.div>
  ) : null;
}
