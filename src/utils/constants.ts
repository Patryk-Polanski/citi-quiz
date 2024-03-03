import { Quiz } from "../types/quiz";

export const TEMP_DATA: Quiz[] = [
  {
    quizId: "1",
    questions: [
      {
        questionId: "1-1",
        question: "In which country is the Lake District?",
        options: [
          {
            letter: "A",
            answer: "Scotland",
          },
          {
            letter: "B",
            answer: "Northern Ireland",
          },
          {
            letter: "C",
            answer: "Wales",
          },
          {
            letter: "D",
            answer: "England",
          },
        ],
        answer: "D",
        explanation: "Lake District is situated in England.",
      },
      {
        questionId: "1-2",
        question: "Which of the following is associated with Christmas?",
        options: [
          {
            letter: "A",
            answer: "Santa Claus",
          },
          {
            letter: "B",
            answer: "Sending anonymous cards",
          },
          {
            letter: "C",
            answer: "Guy Fawkes",
          },
          {
            letter: "D",
            answer: "Practical jokes",
          },
        ],
        answer: "A",
        explanation:
          "Santa Claus is one of the main talking points during Christmas.",
      },
      {
        questionId: "1-3",
        question: "Which of the following statements is correct?",
        options: [
          {
            letter: "A",
            answer: "In the UK, betting and gambling were illegal until 2005",
          },
          {
            letter: "B",
            answer: "In the UK, betting and gamblig are legal",
          },
        ],
        answer: "B",
        explanation: "Betting and gambling have always been legal in the UK.",
      },
      {
        questionId: "1-4",
        question:
          "The game of golf is traditionally thought to have originated in which country?",
        options: [
          {
            letter: "A",
            answer: "England",
          },
          {
            letter: "B",
            answer: "Spain",
          },
          {
            letter: "C",
            answer: "USA",
          },
          {
            letter: "D",
            answer: "Scotland",
          },
        ],
        answer: "D",
        explanation:
          "Scotland was the nation to invent the first version of golf.",
      },
    ],
  },
  {
    quizId: "2",
    questions: [
      {
        questionId: "2-1",
        question:
          "Which of these countries was part of the British Empire during Queen Victoria's reign?",
        options: [
          {
            letter: "A",
            answer: "France",
          },
          {
            letter: "B",
            answer: "Switzerland",
          },
          {
            letter: "C",
            answer: "The USA",
          },
          {
            letter: "D",
            answer: "India",
          },
        ],
        answer: "D",
        explanation:
          "India was part of the British Empire during Queen Victoria's reign.",
      },
      {
        questionId: "2-2",
        question: "Why was Queen Mary given the nickname Bloody Mary?",
        options: [
          {
            letter: "A",
            answer: "She had red hair",
          },
          {
            letter: "B",
            answer: "Because of her persecution of Protestants",
          },
          {
            letter: "C",
            answer: "She had a bad temper",
          },
          {
            letter: "D",
            answer: "Because she executed her husband",
          },
        ],
        answer: "B",
        explanation:
          "This unfortunate 'Bloody Mary' nickname was thanks to her persecution of Protestant heretics, whom she burned at the stake in the hundreds.",
      },
      {
        questionId: "2-3",
        question: "Snowdon is the highest mountain in which country?",
        options: [
          {
            letter: "A",
            answer: "England",
          },
          {
            letter: "B",
            answer: "Wales",
          },
          {
            letter: "C",
            answer: "Scotland",
          },
          {
            letter: "D",
            answer: "Northern Ireland",
          },
        ],
        answer: "B",
        explanation:
          "Snowdon is a mountain in the Snowdonia region of North Wales.",
      },
      {
        questionId: "2-4",
        question: "Which of the following statements is correct?",
        options: [
          {
            letter: "A",
            answer: "The King is the elected leader of the Commonwealth.",
          },
          {
            letter: "B",
            answer: "The King is the ceremonial head of the Commonwealth",
          },
        ],
        answer: "B",
        explanation: "The King is the ceremonial head of the Commonwealth.",
      },
      {
        questionId: "2-5",
        question: "Who was William Shakespeare?",
        options: [
          {
            letter: "A",
            answer: "A naval commander",
          },
          {
            letter: "B",
            answer: "A Scottish patriot",
          },
          {
            letter: "C",
            answer: "An English parliamentarian",
          },
          {
            letter: "D",
            answer: "A poet, actor and playwright",
          },
        ],
        answer: "D",
        explanation:
          "William Shakespeare was an English playwright, poet and actor. He is widely regarded as the greatest writer in the English language and the world's pre-eminent dramatist.",
      },
      {
        questionId: "2-5",
        question:
          "Which other country, alongside Britain, developed Concorde, the supersonic passenger aircraft?",
        options: [
          {
            letter: "A",
            answer: "Germany",
          },
          {
            letter: "B",
            answer: "France",
          },
          {
            letter: "C",
            answer: "Canada",
          },
          {
            letter: "D",
            answer: "South Africa",
          },
        ],
        answer: "B",
        explanation:
          "Concorde is a retired Anglo-French supersonic airliner jointly developed and manufactured by Sud Aviation and the British Aircraft Corporation.",
      },
    ],
  },
];

export const TEMP_QUIZ: Quiz = {
  quizId: "1",
  questions: [
    {
      questionId: "1-1",
      question: "In which country is the Lake District?",
      options: [
        {
          letter: "A",
          answer: "Scotland",
        },
        {
          letter: "B",
          answer: "Northern Ireland",
        },
        {
          letter: "C",
          answer: "Wales",
        },
        {
          letter: "D",
          answer: "England",
        },
      ],
      answer: "D",
      explanation: "Lake District is situated in England.",
    },
    {
      questionId: "1-2",
      question: "Which of the following is associated with Christmas?",
      options: [
        {
          letter: "A",
          answer: "Santa Claus",
        },
        {
          letter: "B",
          answer: "Sending anonymous cards",
        },
        {
          letter: "C",
          answer: "Guy Fawkes",
        },
        {
          letter: "D",
          answer: "Practical jokes",
        },
      ],
      answer: "A",
      explanation:
        "Santa Claus is one of the main talking points during Christmas.",
    },
    {
      questionId: "1-3",
      question: "Which of the following statements is correct?",
      options: [
        {
          letter: "A",
          answer: "In the UK, betting and gambling were illegal until 2005",
        },
        {
          letter: "B",
          answer: "In the UK, betting and gamblig are legal",
        },
      ],
      answer: "B",
      explanation: "Betting and gambling have always been legal in the UK.",
    },
    {
      questionId: "1-4",
      question:
        "The game of golf is traditionally thought to have originated in which country?",
      options: [
        {
          letter: "A",
          answer: "England",
        },
        {
          letter: "B",
          answer: "Spain",
        },
        {
          letter: "C",
          answer: "USA",
        },
        {
          letter: "D",
          answer: "Scotland",
        },
      ],
      answer: "D",
      explanation:
        "Scotland was the nation to invent the first version of golf.",
    },
  ],
};
