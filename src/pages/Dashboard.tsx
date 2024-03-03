import Greeting from "../features/dashboard/Greeting";
import Menu from "../features/dashboard/Menu";
import { useAppSelector } from "../hooks/useStore";

export default function DashboardPage() {
  const { activeQuizId } = useAppSelector((store) => store.stats);
  console.log("🚀 ~ DashboardPage ~ activeQuizId:", activeQuizId);
  return (
    <main className="mt-8 flex flex-col items-center gap-8">
      <Greeting />
      <Menu />
    </main>
  );
}
