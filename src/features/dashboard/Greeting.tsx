import Emoji, { EmojiNames } from "../../ui/Emojis/_Emoji";

export default function Greeting() {
  return (
    <div className="flex items-center gap-1">
      <h2>Welcome back, Adventurer</h2>
      <Emoji emojiName={EmojiNames.Adventurer} />
    </div>
  );
}
