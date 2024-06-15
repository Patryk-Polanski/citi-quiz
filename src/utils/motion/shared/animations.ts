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

export const slideDownAnimParent = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

export const slideDownAnim = {
  initial: {
    opacity: 0,
    transform: "translateY(-1rem)",
  },
  animate: {
    opacity: 1,
    transform: "translateY(0)",
  },
};
