import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { initialUserData } from "src/utils/constants";
import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import { setInitialStats } from "src/store/stats-slice";
import { setUser } from "src/store/auth-slice";
import { onAuthChange } from "src/lib/@firebase";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import BackgroundBlob from "src/ui/decorative/BackgroundBlob";
import { DefaultStatsValueTypes, DefaultValueTypes } from "src/types/stats";
import { setSettings } from "src/store/settings-slice";
import useQuizzes from "src/hooks/useQuizzes";
import LoadingSpinner from "src/ui/decorative/LoadingSpinner";
import useUserStats from "src/hooks/useUserStats";
import { SettingsTypes } from "src/types/settings";
import useLocalStorage from "src/hooks/useLocalStorage";

export default function AppLayout() {
  const { user } = useAppSelector((store) => store.auth);
  const { background, fontSize } = useAppSelector((store) => store.settings);
  const dispatch = useAppDispatch();
  const { isLoading: isUserStatsLoading, data: userData } = useUserStats(
    user?.uid,
  );

  const {
    isLoading: isQuizzesLoading,
    isError: isQuizzesError,
    isEmptyError: isQuizzesEmptyError,
    data: quizzesData,
  } = useQuizzes();
  const [statsLocalStorage, setStatsLocalStorage] = useLocalStorage(
    "citiquiz",
    {
      stats: {
        quizzes: [],
        tryAgainQuestionIds: [],
        survivalQuizHighestScore: 0,
      },
      settings: initialUserData.settings,
    },
  );

  useEffect(() => {
    const unsub = onAuthChange((user) => {
      dispatch(setUser(user));
    });

    return unsub;
  }, [dispatch]);

  useEffect(() => {
    if (!quizzesData) return;
    setStatsLocalStorage((prevVal: DefaultValueTypes) => {
      if ("stats" in prevVal) {
        return {
          ...prevVal,
          stats: {
            ...prevVal.stats,
            quizzes:
              (prevVal.stats.quizzes.length > 0 && prevVal.stats.quizzes) ||
              initialUserData.stats(quizzesData).quizzes,
          },
        };
      } else {
        return {
          ...prevVal,
        };
      }
    });
  }, [quizzesData, setStatsLocalStorage]);

  useEffect(() => {
    if (user && userData) {
      if ("stats" in userData)
        dispatch(setInitialStats(userData.stats as DefaultStatsValueTypes));
      if ("settings" in userData)
        dispatch(setSettings(userData.settings as SettingsTypes));
    } else {
      if ("stats" in statsLocalStorage)
        dispatch(setInitialStats(statsLocalStorage.stats));
      if ("settings" in statsLocalStorage)
        dispatch(setSettings(statsLocalStorage.settings));
    }
  }, [statsLocalStorage, dispatch, user, userData]);

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
          className={`container mx-auto grow ${isQuizzesLoading && "flex items-center justify-center"}`}
        >
          {(isQuizzesLoading || isUserStatsLoading) && <LoadingSpinner />}
          {(isQuizzesError || isQuizzesEmptyError) && (
            <h4 className="mt-10 text-center">
              Could not fetch data :( <br /> Please try again later
            </h4>
          )}
          {!isQuizzesLoading && !isQuizzesError && !isQuizzesEmptyError && (
            <Outlet />
          )}
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
