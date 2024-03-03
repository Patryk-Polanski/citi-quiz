import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type userStats } from "../types/stats";

const initialState: userStats = {
  quizzes: [],
  tryAgainQuestionIds: [],
  activeQuizId: "",
  activeQuizScore: [],
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setActiveQuiz(state, action: PayloadAction<string>) {
      state.activeQuizId = action.payload;
    },
  },
});

export const { setActiveQuiz } = statsSlice.actions;
