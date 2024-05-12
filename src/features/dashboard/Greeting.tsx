import { useEffect, useRef, useState } from "react";

import { useAppSelector, useAppDispatch } from "src/hooks/useStore";
import { setGreeting } from "src/store/greeting-slice";
import { EmojiNames } from "src/types/enums";
import Emoji from "src/ui/Emojis/Emoji";
import { generateRandomNumber } from "src/utils/helpers";

const emojisData = Object.values(EmojiNames);
emojisData.shift();

// duplicated data for better slot machine effect
const extendedEmojisArr = [...emojisData, ...emojisData];

const randomEmojiIndex = generateRandomNumber(
  emojisData.length + 1,
  emojisData.length * 2,
);

export default function Greeting() {
  const [emojisReady, setEmojisReady] = useState(false);
  const dispatch = useAppDispatch();
  const { emojiIndex } = useAppSelector((store) => store.greeting);
  const greetingRef = useRef<HTMLHeadingElement | null>(null);
  const computedFontSize = useRef<number>(16);

  useEffect(() => {
    if (greetingRef.current) {
      computedFontSize.current = parseInt(
        window
          .getComputedStyle(greetingRef.current)
          .getPropertyValue("font-size"),
      );
    }
    setTimeout(
      () => {
        setEmojisReady(true);
      },
      emojiIndex ? 0 : 1000,
    );
    if (emojiIndex) return;
    setTimeout(() => {
      dispatch(setGreeting(randomEmojiIndex));
    }, 5000);
  }, [dispatch, emojiIndex]);

  return (
    <div className="flex items-center gap-1">
      <h2
        className="flex items-center justify-end text-lg leading-7"
        ref={greetingRef}
      >
        Welcome back,
        {/* emoji name */}
        <span className="ml-1 h-9 overflow-hidden rounded-md">
          <ul
            aria-hidden={true}
            className={`flex flex-col justify-center bg-white/20 ${!emojiIndex && "transition-all delay-[800ms] duration-[4000ms]"}  ease-in-out`}
            style={{
              transform: emojisReady
                ? `translateY(-${(computedFontSize.current + computedFontSize.current) * (emojiIndex || randomEmojiIndex) + "px"})`
                : "",
            }}
          >
            <li key="unknown" className="p-1 text-center text-lg leading-7">
              ???
            </li>
            {extendedEmojisArr.map((emojiName, index) => {
              return (
                <li
                  key={`${emojiName}-${index}`}
                  className="p-1 text-center text-lg leading-7"
                >
                  {emojiName.replace("-", " ")}
                </li>
              );
            })}
          </ul>
        </span>
        {/* emoji */}
        <span className="ml-1 h-9 overflow-hidden rounded-md">
          <ul
            className={`flex flex-col justify-center bg-white/20 ${!emojiIndex && "transition-all delay-[1400ms] duration-[4000ms]"} ease-in-out`}
            style={{
              transform: emojisReady
                ? `translateY(-${(computedFontSize.current + computedFontSize.current) * (emojiIndex || randomEmojiIndex) + "px"})`
                : "",
            }}
          >
            <li key="unknown" className="p-1">
              <Emoji
                emojiName={EmojiNames.Unknown}
                className="box-border w-7"
              />
            </li>
            {extendedEmojisArr.map((emoji, index) => {
              return (
                <li key={`${emoji}-${index}`} className="p-[4px]">
                  <Emoji emojiName={emoji} className="box-border w-7" />
                </li>
              );
            })}
          </ul>
        </span>
      </h2>
    </div>
  );
}
