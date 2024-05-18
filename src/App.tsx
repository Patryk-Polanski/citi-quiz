import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "src/pages/AppLayout";
import DashboardPage from "src/pages/Dashboard";
import FaqsPage from "src/pages/Faqs";
import ResourcesPage from "src/pages/Resources";
import SettingsPage from "src/pages/Settings";
import QuizzesPage from "src/pages/Quizzes";
import QuizWrapper from "./pages/QuizWrapper";
import QuizPage from "src/pages/Quiz";
import TryAgainQuizPage from "src/pages/QuizTryAgain";
import SurvivalQuizPage from "src/pages/QuizSurvival";
import Error from "src/ui/Error";

import "./index.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <DashboardPage /> },
      {
        path: "/quizzes",
        element: <QuizzesPage />,
      },
      {
        element: <QuizWrapper />,
        children: [
          { path: "/quiz/try-again", element: <TryAgainQuizPage /> },
          { path: "/quiz/survival", element: <SurvivalQuizPage /> },
          { path: "/quiz/:quizId", element: <QuizPage /> },
        ],
      },
      { path: "/resources", element: <ResourcesPage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/faqs", element: <FaqsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
