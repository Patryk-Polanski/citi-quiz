// emojis pngs are in the public folder so the img path can be dynamic

export enum EmojiNames {
  Adventurer = "adventurer",
  Explorer = "explorer",
  Virtuoso = "virtuoso",
  Connoisseur = "connoisseur",
  Stargazer = "stargazer",
  DifferenceMaker = "difference-maker",
  Achiever = "achiever",
  Philosopher = "philosopher",
  Trailblazer = "trailblazer",
  Traveller = "traveller",
  Scholar = "scholar",
  Wordsmith = "wordsmith",
  Humorist = "humorist",
  DragonSlayer = "dragon-slayer",
  Enchanter = "enchanter",
  Altruist = "altruist",
  Dreamer = "dreamer",
  Sorcerer = "sorcerer",
  Companion = "companion",
  Conqueror = "conqueror",
  Performer = "performer",
  Warrior = "warrior",
}

type EmojiProps = {
  emojiName: EmojiNames;
  className?: string;
};

export default function Emoji({ emojiName, className }: EmojiProps) {
  return (
    <img
      src={`../../../public/assets/emojis/${emojiName}.png`}
      className={`w-6 ${className}`}
    />
  );
}
