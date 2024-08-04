import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { initialUserData } from "src/utils/constants";
import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import { setInitialStats } from "src/store/stats-slice";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import BackgroundBlob from "src/ui/decorative/BackgroundBlob";
import useLocalStorage from "src/hooks/useLocalStorage";
import { setSettings } from "src/store/settings-slice";
import useQuizzes from "src/hooks/useQuizzes";
import LoadingSpinner from "src/ui/decorative/LoadingSpinner";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const { isLoading, isError, isEmptyError, data: quizzesData } = useQuizzes();
  const [statsLocalStorage, setStatsLocalStorage] = useLocalStorage(
    "citiquiz",
    {
      stats: [],
      settings: initialUserData.settings,
    },
  );
  const { background, fontSize } = useAppSelector((store) => store.settings);

  useEffect(() => {
    if (!quizzesData) return;
    setStatsLocalStorage((prevVal) => {
      return {
        ...prevVal,
        stats: initialUserData.stats(quizzesData),
      };
    });
  }, [quizzesData, setStatsLocalStorage]);

  // todo: replace later with tanstack query when db is ready
  useEffect(() => {
    dispatch(setInitialStats(statsLocalStorage.stats));
    dispatch(setSettings(statsLocalStorage.settings));
  }, [statsLocalStorage, dispatch]);

  useEffect(() => {
    document.getElementsByTagName("html")[0].className = fontSize;
  }, [fontSize]);

  return (
    <div
      className={`relative min-h-screen ${background} overflow-x-hidden font-comfortaa text-white`}
    >
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-white/50 to-white/20">
        <AppHeader />
        <main
          className={`container mx-auto grow ${isLoading && "flex items-center justify-center"}`}
        >
          {isLoading && <LoadingSpinner />}
          {(isError || isEmptyError) && (
            <h4 className="mt-10 text-center">
              Could not fetch data :( <br /> Please try again later
            </h4>
          )}
          {!isLoading && !isError && !isEmptyError && <Outlet />}
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
