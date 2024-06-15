// to use the exit animation, parent div must be wrapped with <AnimatePresence>

export const genericCardsAnim = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

export const genericCardAnim = {
  initial: {
    opacity: 0,
    transform: "translateX(-1rem)",
  },
  animate: {
    opacity: 1,
    transform: "translateX(0)",
    transition: { duration: 0.5 },
  },
};
