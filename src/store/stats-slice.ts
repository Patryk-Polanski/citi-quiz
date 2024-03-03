import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type userStats } from "../types/stats";

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
  },
});

export const { setActiveQuiz } = statsSlice.actions;
