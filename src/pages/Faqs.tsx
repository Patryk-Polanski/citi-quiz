import { motion as m } from "framer-motion";

import Accordion from "src/features/help/Accordion";
import { BlobGradients } from "src/types/enums";
import { Faqs } from "src/types/help";
import {
  genericCardAnim,
  genericCardsAnim,
} from "src/utils/motion/cards/animations";
import { blobAnim, genericAnimProps } from "src/utils/motion/shared/animations";

const FAQS: Faqs = [
  {
    id: "01",
    question: "What is the purpose of this app?",
    answer:
      "The purpose is to help British Citizenship applicants practice their 'Life in the UK' knowledge, which is a pre-requisite in the form of a quiz that needs to be passed in order to apply for a British citizenship.",
  },
  {
    id: "02",
    question: "Do I need to set up an account to use the app?",
    answer:
      "The app can be used without an account, although registering allows the user to access their quizzes statistics from multiple devices.",
  },
  {
    id: "03",
    question: "Is the app free?",
    answer: "Yes, the app is a completely free, open source project.",
  },
  {
    id: "04",
    question: "Where are the quizzes sourced from?",
    answer:
      "The questions and answers have been sourced from the official Life in the UK Practice Questions Book. More information on this can be found in the resources section.",
  },
];

export default function FaqsPage() {
  return (
    <section>
      <h2 className="mb-10 mt-6 text-center">FAQs</h2>
      <m.ul
        className="relative"
        {...genericAnimProps}
        variants={genericCardsAnim}
      >
        <m.span
          {...genericAnimProps}
          variants={blobAnim}
          className={`absolute left-0 top-0 h-full w-full rounded-full bg-gradient-radial blur-lg ${BlobGradients.Amber}`}
        />
        {FAQS.map((faq) => (
          <m.div variants={genericCardAnim}>
            <Accordion faq={faq} />
          </m.div>
        ))}
      </m.ul>
    </section>
  );
}
