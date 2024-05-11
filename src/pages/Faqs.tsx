import Accordion from "src/features/help/Accordion";
import { BlobGradients } from "src/types/enums";
import { Faqs } from "src/types/help";

const FAQS: Faqs = [
  {
    id: "01",
    question: "What is the purpose of this app?",
    answer:
      "Magnis dis parturient montes nascetur ridiculus mus. Sapien nec sagittis aliquam malesuada bibendum. Feugiat pretium nibh ipsum consequat. Amet mattis vulputate enim nulla aliquet. Etiam sit amet nisl purus. Adipiscing diam donec adipiscing tristique. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. ",
  },
  {
    id: "02",
    question: "Do I need to set up an account to use the app?",
    answer:
      "Aliquam etiam erat velit scelerisque in dictum non consectetur. In hac habitasse platea dictumst quisque sagittis purus sit. Scelerisque purus semper eget duis at tellus at. Duis at tellus at urna condimentum mattis. Sed vulputate odio ut enim. Malesuada fames ac turpis egestas maecenas pharetra convallis.",
  },
  {
    id: "03",
    question: "Is the app free?",
    answer:
      "Nibh ipsum consequat nisl vel. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Mollis aliquam ut porttitor leo.",
  },
  {
    id: "04",
    question: "Where are the quizzes sourced from?",
    answer:
      "Dictum fusce ut placerat orci nulla pellentesque. Egestas congue quisque egestas diam in arcu cursus euismod quis. In ante metus dictum at tempor commodo ullamcorper. Feugiat nisl pretium fusce id velit ut. Faucibus nisl tincidunt eget nullam non nisi est sit.",
  },
];

export default function FaqsPage() {
  return (
    <section>
      <h2 className="mb-10 mt-6 text-center font-laila text-3xl">FAQs</h2>
      <div className="relative">
        <span
          className={`absolute left-0 top-0 h-full w-full rounded-full bg-gradient-radial blur-lg ${BlobGradients.Amber}`}
        />
        {FAQS.map((faq) => (
          <Accordion faq={faq} />
        ))}
      </div>
    </section>
  );
}
