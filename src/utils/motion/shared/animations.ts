import { AnimDirection } from "src/types/enums";

export const genericAnimProps = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
};

export const blobAnim = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 1.8 },
  },
};

export const slideAnimParent = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

export const slideAnim = (direction: AnimDirection = AnimDirection.down) => {
  return {
    initial: {
      opacity: 0,
      transform:
        direction === AnimDirection.down
          ? "translateY(-1rem)"
          : "translateY(1rem)",
    },
    animate: {
      opacity: 1,
      transform: "translateY(0)",
    },
    exit: {
      opacity: 0,
      transform:
        direction === AnimDirection.down
          ? "translateY(-1rem)"
          : "translateY(1rem)",
    },
  };
};

export const popAnimParent = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

export const popAnim = {
  initial: {
    transform: "scale(0.4)",
  },
  animate: {
    transform: ["scale(1.2)", "scale(1)"],
    transition: { type: "spring", stiffness: 100 },
  },
};

export const popAnimWithOpacity = {
  initial: {
    opacity: 0,
    transform: "scale(0.4)",
  },
  animate: {
    opacity: 1,
    transform: ["scale(1.2)", "scale(1)"],
    transition: { type: "spring", stiffness: 100 },
  },
};
