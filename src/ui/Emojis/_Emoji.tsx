// emojis pngs are in the public folder so the img path can be dynamic
import { EmojiNames } from "../../types/enums";

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
