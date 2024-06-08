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

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const [statsLocalStorage] = useLocalStorage("citiquiz", initialUserData);
  const { background, fontSize } = useAppSelector((store) => store.settings);

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
