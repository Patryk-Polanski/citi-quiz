import Greeting from "../features/dashboard/Greeting";
import Menu from "../features/dashboard/Menu";

export default function DashboardPage() {
  return (
    <main className="mt-8 flex flex-col items-center gap-10">
      <Greeting />
      <Menu />
    </main>
  );
}
