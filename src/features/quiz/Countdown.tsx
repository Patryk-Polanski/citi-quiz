import { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState(2699); // 2700 is 45 minutes in seconds (-1 second)
  const [displayTime, setDisplayTime] = useState("45:00");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);

      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      setDisplayTime(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );
    }, 1000);

    if (time < 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div>
      <span className="ml-2 text-xl">{displayTime}</span>
    </div>
  );
}
