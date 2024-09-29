import {
  type ChangeEvent,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { motion as m } from "framer-motion";

import {
  genericAnimProps,
  slideAnim,
  slideAnimParent,
} from "src/utils/motion/shared/animations";

import { useAppDispatch, useAppSelector } from "src/hooks/useStore";
import {
  setFontSize,
  setBackground,
  setSettings,
} from "src/store/settings-slice";

import useQuizzes from "src/hooks/useQuizzes";
import useUpdateUserStats from "src/hooks/useUpdateUserStats";
import useLocalStorage, {
  type DefaultValueTypes,
} from "src/hooks/useLocalStorage";
import { initialUserData } from "src/utils/constants";
import { setInitialStats } from "src/store/stats-slice";
import { transformQuizzesArrToObj } from "src/utils/dataManipulation";

import Setting from "src/features/settings/Setting";
import LockClosed from "src/ui/icons/LockClosed";
import LockOpen from "src/ui/icons/LockOpen";
import SwatchRadio from "src/ui/form/SwatchRadio";
import TextRadio from "src/ui/form/TextRadio";
import Toggle from "src/ui/form/Toggle";
import Input from "src/ui/form/Input";
import Button from "src/ui/Button";
import usePasswordResetLink from "src/hooks/usePasswordResetLink";
import { checkIfEmpty } from "src/utils/validation/account";

const FONT_SIZES = [
  {
    id: "small",
    value: "small",
  },
  {
    id: "medium",
    value: "medium",
  },
  {
    id: "large",
    value: "large",
  },
];

const BACKGROUNDS = [
  {
    id: "bg-sky-700",
    value: "bg-sky-600",
  },
  {
    id: "bg-orange-700",
    value: "bg-orange-700",
  },
  {
    id: "bg-green-700",
    value: "bg-green-700",
  },
  {
    id: "bg-red-700",
    value: "bg-red-700",
  },
];

export default function SettingsPage() {
  const { data: quizzesData } = useQuizzes();
  const { sendPasswordResetLink, isSendingPasswordResetLinkPending } =
    usePasswordResetLink();
  const { user } = useAppSelector((store) => store.auth);
  const { fontSize, background } = useAppSelector((store) => store.settings);
  const stats = useAppSelector((store) => store.stats);
  const dispatch = useAppDispatch();
  const [isClearDataAllowed, setIsClearDataAllowed] = useState(false);
  const [clearData, setClearData] = useState(false);
  const resetAppSubtitle = useRef("*This will delete all data");
  const resetEmailSubtitle = useRef(
    "Enter your email to receive password reset link",
  );
  const [statsLocalStorage, setStatsLocalStorage] = useLocalStorage("citiquiz");
  const { updateUserStats } = useUpdateUserStats();
  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleFontSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setFontSize(e.target.value));
      if (user) {
        updateUserStats({
          dataToUpdate: {
            "settings.fontSize": e.target.value,
          },
        });
      }
    },
    [dispatch, updateUserStats, user],
  );

  const handleBackgroundChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setBackground(e.target.value));
      if (user) {
        updateUserStats({
          dataToUpdate: {
            "settings.background": e.target.value,
          },
        });
      }
    },
    [dispatch, updateUserStats, user],
  );

  const handleEraseData = useCallback(() => {
    setClearData((prevVal) => !prevVal);
    const initialStats = initialUserData.stats(quizzesData);
    dispatch(setInitialStats(initialStats));
    dispatch(setSettings(initialUserData.settings));
    setStatsLocalStorage({
      ...initialUserData.stats(quizzesData),
      ...initialUserData.settings,
    });
    if (user) {
      const formattedQuizzes = transformQuizzesArrToObj(initialStats.quizzes);
      updateUserStats({
        dataToUpdate: {
          stats: {
            quizzes: formattedQuizzes,
            tryAgainQuestionIds: [],
            survivalQuizHighestScore: 0,
          },
        },
      });
    }
    resetAppSubtitle.current = "Application data has been reset";
    setIsClearDataAllowed(false);
  }, [setStatsLocalStorage, dispatch, quizzesData, updateUserStats, user]);

  useEffect(() => {
    setStatsLocalStorage((prevVal: DefaultValueTypes) => ({
      ...prevVal,
      stats,
      settings: {
        background,
        fontSize,
      },
    }));
  }, [setStatsLocalStorage, fontSize, background, stats]);

  const handlePasswordResetLink = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (checkIfEmpty(emailRef?.current?.value)) {
        return (resetEmailSubtitle.current = "Email cannot be empty");
      }

      sendPasswordResetLink(
        { email: emailRef?.current?.value as string },
        {
          onSuccess: () => {
            resetEmailSubtitle.current = "Check your email for reset link";
            if (emailRef?.current) {
              emailRef.current.value = "";
            }
          },
        },
      );
    },
    [sendPasswordResetLink],
  );

  return (
    <section>
      <h2 className="mb-6 mt-6 text-center">Settings</h2>
      <small className="block text-center">
        Changes are saved automatically
      </small>
      <m.div
        className="mt-14 flex flex-col gap-16"
        {...genericAnimProps}
        variants={slideAnimParent}
      >
        <m.div variants={slideAnim()}>
          <Setting title="Font size">
            <div className="flex gap-6">
              {FONT_SIZES.map((size) => (
                <TextRadio
                  key={size.id}
                  id={size.id}
                  name="font-size"
                  value={size.value}
                  fontSize={fontSize}
                  onChange={handleFontSizeChange}
                />
              ))}
            </div>
          </Setting>
        </m.div>
        <m.div variants={slideAnim()}>
          <Setting title="Background">
            <div className="flex gap-7">
              {BACKGROUNDS.map((color) => (
                <SwatchRadio
                  key={color.id}
                  id={color.id}
                  name="background"
                  value={color.value}
                  swatchClass={`before:${color.value}`}
                  background={background}
                  onChange={handleBackgroundChange}
                />
              ))}
            </div>
          </Setting>
        </m.div>
        <m.div variants={slideAnim()}>
          <Setting title="Reset app*" subtitle={resetAppSubtitle.current}>
            <div className="flex items-center gap-4 leading-none">
              <Toggle
                id="erase-data"
                name="erase-data"
                value="erase-data"
                isClearDataAllowed={isClearDataAllowed}
                onChange={handleEraseData}
              />
              {!isClearDataAllowed && (
                <div
                  className={!clearData ? "cursor-pointer" : ""}
                  onClick={() => !clearData && setIsClearDataAllowed(true)}
                >
                  <LockClosed className="h-7 w-7" />
                </div>
              )}
              {isClearDataAllowed && (
                <div
                  className={!clearData ? "cursor-pointer" : ""}
                  onClick={() => !clearData && setIsClearDataAllowed(false)}
                >
                  <LockOpen className="h-7 w-7" />
                </div>
              )}
            </div>
          </Setting>
        </m.div>
        {user && (
          <m.div variants={slideAnim()}>
            <Setting
              title="Forgot password reset link"
              subtitle={resetEmailSubtitle.current}
            >
              <form
                className="mb-2 mt-4 flex flex-col items-end justify-end gap-3 sm:flex-row"
                onSubmit={handlePasswordResetLink}
              >
                <Input
                  id="email"
                  label="Email:"
                  name="email"
                  type="email"
                  inputRef={emailRef}
                  maxLength={64}
                />
                <Button
                  el="button"
                  type="submit"
                  classes="mt-2 self-center text-sm px-6 py-3 rounded-lg after:rounded-lg font-bold"
                  disabled={isSendingPasswordResetLinkPending}
                  isLoading={isSendingPasswordResetLinkPending}
                >
                  Submit
                </Button>
              </form>
            </Setting>
          </m.div>
        )}
      </m.div>
    </section>
  );
}
