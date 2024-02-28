import Emoji, { EmojiNames } from "../ui/Emojis/_Emoji";

export default function DashboardPage() {
  return (
    <>
      <div>Dashboard</div>
      <Emoji emojiName={EmojiNames.Connoisseur} />
    </>
  );
}
