import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserStats, QuizStats } from "../types/stats";
import { calcHighestScore } from "src/utils/dataManipulation";
import { DefaultValueTypes } from "src/hooks/useLocalStorage";

const initialState: UserStats = {
  quizzes: [],
  tryAgainQuestionIds: [],
  activeQuizId: null,
  activeQuizScore: [],
  survivalQuizHighestScore: 0,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setActiveQuiz(state, action: PayloadAction<UserStats["activeQuizId"]>) {
      state.activeQuizId = action.payload;
    },
    setInitialStats(state, action: PayloadAction<DefaultValueTypes["stats"]>) {
      state.quizzes = action.payload.quizzes;
      state.tryAgainQuestionIds = action.payload.tryAgainQuestionIds;
      state.survivalQuizHighestScore = action.payload.survivalQuizHighestScore;
    },
    updateQuizzesStats(state, action: PayloadAction<QuizStats[]>) {
      if (!state.activeQuizId) return;

      const currentHighestScore = calcHighestScore(
        state.quizzes[Number(state.activeQuizId) - 1],
      );
      const finishedQuizScore = calcHighestScore(action.payload);

      if (finishedQuizScore > currentHighestScore) {
        state.quizzes[Number(state.activeQuizId) - 1] = state.quizzes[
          Number(state.activeQuizId) - 1
        ].map((question, index) => {
          if (action.payload[index]?.pass) return action.payload[index];
          return question;
        });
      }
    },
    updateActiveQuizScore(state, action: PayloadAction<QuizStats>) {
      state.activeQuizScore.push(action.payload);
    },
    resetActiveQuiz(state) {
      state.activeQuizId = null;
      state.activeQuizScore = [];
    },
    updateTryAgainQuestionIds(state, action: PayloadAction<string[]>) {
      state.tryAgainQuestionIds = [
        ...new Set([...state.tryAgainQuestionIds, ...action.payload]),
      ];
    },
    resetTryAgainQuestionIds(state) {
      state.tryAgainQuestionIds = [];
    },
    updateSurvivalQuizHighestScore(state, action: PayloadAction<number>) {
      state.survivalQuizHighestScore = action.payload;
    },
  },
});

export const {
  setActiveQuiz,
  setInitialStats,
  updateQuizzesStats,
  updateActiveQuizScore,
  resetActiveQuiz,
  updateTryAgainQuestionIds,
  resetTryAgainQuestionIds,
  updateSurvivalQuizHighestScore,
} = statsSlice.actions;
