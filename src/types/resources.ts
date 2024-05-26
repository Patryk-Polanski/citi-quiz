export type LearningResource = {
  id: string;
  text: string;
  imagePath: string;
  alt: string;
  imagePath2?: string;
  alt2?: string;
};

export type LearningResources = LearningResource[];
