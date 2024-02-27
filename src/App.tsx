import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import DashboardPage from "./pages/Dashboard";
import FaqsPage from "./pages/Faqs";
import ResourcesPage from "./pages/Resources";
import SettingsPage from "./pages/Settings";
import QuizzesPage from "./pages/Quizzes";
import QuizPage from "./pages/Quiz";
import Error from "./ui/Error";

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
      { path: "/quiz/:quizId", element: <QuizPage /> },
      { path: "/resources", element: <ResourcesPage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/faqs", element: <FaqsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
