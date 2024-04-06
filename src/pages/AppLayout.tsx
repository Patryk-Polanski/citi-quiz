import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { TEMP_DATA } from "src/utils/constants";
import { useAppDispatch } from "src/hooks/useStore";
import { setQuizzesStats } from "src/store/stats-slice";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import BackgroundBlob from "src/ui/decorative/BackgroundBlob";

export default function AppLayout() {
  const dispatch = useAppDispatch();

  // todo: replace later with tanstack query when db is ready
  useEffect(() => {
    const stats = TEMP_DATA.map((quiz) => {
      const questionsStats = quiz.questions.map((question) => ({
        questionId: question.questionId,
        pass: false,
      }));
      return questionsStats;
    });

    dispatch(setQuizzesStats(stats));
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-sky-600 font-comfortaa text-white">
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-white/50 to-white/20">
        <AppHeader />
        <div className="container mx-auto grow">
          <Outlet />
        </div>
        <AppFooter />
        <BackgroundBlob classes="top-[200px] right-[200px] h-8 w-8" />
        <BackgroundBlob classes="top-[180px] left-[200px]" />
        <BackgroundBlob classes="bottom-[180px] right-[200px]" />
        <BackgroundBlob classes="bottom-[200px] left-[200px] h-8 w-8" />
      </div>
    </div>
  );
}
