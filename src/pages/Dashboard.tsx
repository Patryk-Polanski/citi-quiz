import Greeting from "../features/dashboard/Greeting";
import Menu from "../features/dashboard/Menu";

export default function DashboardPage() {
  return (
    <main className="mt-8 flex flex-col items-center gap-8">
      <Greeting />
      <Menu />
    </main>
  );
}
