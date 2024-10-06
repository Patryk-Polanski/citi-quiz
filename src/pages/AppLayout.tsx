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
import useLocalStorage, { DefaultValueTypes } from "src/hooks/useLocalStorage";
import { setSettings } from "src/store/settings-slice";
import useQuizzes from "src/hooks/useQuizzes";
import LoadingSpinner from "src/ui/decorative/LoadingSpinner";
import useUserStats from "src/hooks/useUserStats";

export default function AppLayout() {
  const { user } = useAppSelector((store) => store.auth);
  const { background, fontSize } = useAppSelector((store) => store.settings);
  const dispatch = useAppDispatch();
  const {
    isLoading: isUserStatsLoading,
    isError: isUserStatsError,
    data: userData,
  } = useUserStats(user?.uid);

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
      return {
        ...prevVal,
        stats: {
          ...prevVal.stats,
          quizzes: initialUserData.stats(quizzesData).quizzes,
        },
      };
    });
  }, [quizzesData, setStatsLocalStorage]);

  useEffect(() => {
    if (user && userData) {
      dispatch(setInitialStats(userData.stats));
      dispatch(setSettings(userData.settings));
    } else {
      dispatch(setInitialStats(statsLocalStorage.stats));
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
          {isQuizzesLoading || (isUserStatsLoading && <LoadingSpinner />)}
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
