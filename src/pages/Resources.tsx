import { motion as m } from "framer-motion";

import {
  genericAnimProps,
  slideAnim,
} from "src/utils/motion/shared/animations";

import ListItem from "src/features/learning/ListItem";
import { LearningResources } from "src/types/resources";
import Button from "src/ui/Button";
import { slideAnimParent } from "src/utils/motion/shared/animations";

const resources: LearningResources = [
  {
    text: "Official Life in the UK study book and practice questions",
    imagePath: "/assets/images/study-books.png",
    alt: "image of official study books",
    id: "1",
  },
  {
    text: "Official Life in the UK e-Learning subscription",
    imagePath: "/assets/images/study-platform.png",
    alt: "image of official study app",
    id: "2",
  },
  {
    text: "Official Life in the UK App (Android & IOS)",
    imagePath: "/assets/images/study-app.png",
    alt: "image of official app",
    imagePath2: "/assets/images/study-badge.png",
    alt2: "official study app badge",
    id: "3",
  },
];

export default function ResourcesPage() {
  return (
    <section>
      <h2 className="mb-10 mt-6 text-center">Learning Resources</h2>
      <m.ol
        className="flex flex-col gap-12"
        {...genericAnimProps}
        variants={slideAnimParent}
      >
        {resources.map((resource) => (
          <m.li
            className="flex flex-col items-start gap-6"
            variants={slideAnim()}
          >
            <ListItem key={resource.id} resource={resource} />
          </m.li>
        ))}
      </m.ol>
      <p className="mt-24 text-center">
        For more information&nbsp;
        <Button
          el="link"
          href="https://www.officiallifeintheuk.co.uk/shop"
          target="_blank"
          omitStyles
          classes="inline underline"
        >
          click here
        </Button>
      </p>
    </section>
  );
}
