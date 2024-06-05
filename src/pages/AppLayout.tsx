import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { TEMP_DATA } from "src/utils/constants";
import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import { setInitialStats } from "src/store/stats-slice";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import BackgroundBlob from "src/ui/decorative/BackgroundBlob";
import useLocalStorage from "src/hooks/useLocalStorage";
import { setSettings } from "src/store/settings-slice";

const stats = TEMP_DATA.map((quiz) => {
  const questionsStats = quiz.questions.map((question) => ({
    questionId: question.questionId,
    pass: false,
  }));
  return questionsStats;
});

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const [statsLocalStorage] = useLocalStorage("citiquiz", {
    stats: {
      quizzes: stats,
      tryAgainQuestionIds: [],
      survivalQuizHighestScore: 0,
    },
    settings: {
      fontSize: "medium",
      background: "bg-sky-600",
    },
  });
  const { background, fontSize } = useAppSelector((store) => store.settings);

  // todo: replace later with tanstack query when db is ready
  useEffect(() => {
    if (statsLocalStorage?.stats)
      dispatch(setInitialStats(statsLocalStorage.stats));
    if (statsLocalStorage?.settings)
      dispatch(setSettings(statsLocalStorage.settings));
  }, []);

  useEffect(() => {
    document.getElementsByTagName("html")[0].className = fontSize;
  }, [fontSize]);

  return (
    <div
      className={`relative min-h-screen ${background} font-comfortaa text-white`}
    >
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-white/50 to-white/20">
        <AppHeader />
        <main className="container mx-auto grow">
          <Outlet />
        </main>
        <AppFooter />
        <BackgroundBlob classes="top-[200px] right-[200px] h-8 w-8" />
        <BackgroundBlob classes="top-[180px] left-[200px]" />
        <BackgroundBlob classes="bottom-[180px] right-[200px]" />
        <BackgroundBlob classes="bottom-[200px] left-[200px] h-8 w-8" />
      </div>
    </div>
  );
}
