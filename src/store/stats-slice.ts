import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type userStats, quizStats } from "../types/stats";

const initialState: userStats = {
  quizzes: [],
  tryAgainQuestionIds: [],
  activeQuizId: null,
  activeQuizScore: [],
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setActiveQuiz(state, action: PayloadAction<string | null>) {
      state.activeQuizId = action.payload;
    },
    setQuizzesStats(state, action: PayloadAction<quizStats[][]>) {
      state.quizzes = action.payload;
    },
    updateActiveQuizScore(state, action: PayloadAction<quizStats>) {
      state.activeQuizScore.push(action.payload);
    },
    resetActiveQuiz(state) {
      state.activeQuizId = null;
      state.activeQuizScore = [];
    },
  },
});

export const {
  setActiveQuiz,
  setQuizzesStats,
  updateActiveQuizScore,
  resetActiveQuiz,
} = statsSlice.actions;
