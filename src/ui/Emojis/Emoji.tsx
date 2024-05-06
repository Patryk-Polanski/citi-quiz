// emojis pngs are in the public folder so the img path can be dynamic
import { EmojiNames, EmojiReactions } from "src/types/enums";

type EmojiProps = {
  emojiName: EmojiNames | EmojiReactions;
  className?: string;
};

export default function Emoji({ emojiName, className }: EmojiProps) {
  return <img src={`/assets/emojis/${emojiName}.png`} className={className} />;
}
