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
    setActiveQuiz(state, action: PayloadAction<userStats["activeQuizId"]>) {
      state.activeQuizId = action.payload;
    },
    setQuizzesStats(state, action: PayloadAction<quizStats[][]>) {
      state.quizzes = action.payload;
    },
    updateQuizzesStats(state, action: PayloadAction<quizStats[]>) {
      if (!state.activeQuizId) return;

      const currentHighestScore = state.quizzes[
        Number(state.activeQuizId) - 1
      ]?.reduce((acc, question) => (question.pass ? acc + 1 : acc), 0);

      const finishedQuizScore = action.payload.reduce(
        (acc, question) => (question.pass ? acc + 1 : acc),
        0,
      );

      console.log("highestScore", currentHighestScore);
      console.log("finishedQuizScore", finishedQuizScore);

      if (finishedQuizScore > currentHighestScore)
        state.quizzes[Number(state.activeQuizId) - 1] = action.payload;
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
  updateQuizzesStats,
  updateActiveQuizScore,
  resetActiveQuiz,
} = statsSlice.actions;
