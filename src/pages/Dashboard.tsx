import Greeting from "src/features/dashboard/Greeting";
import Menu from "src/features/dashboard/Menu";

export default function DashboardPage() {
  return (
    <main className="mt-8 flex flex-col items-center gap-8">
      <Greeting />
      <Menu />
    </main>
  );
}
