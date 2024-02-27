import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";

export default function AppLayout() {
  return (
    <div className="relative min-h-screen bg-sky-600">
      <div className="min-h-screen bg-gradient-to-br from-white/50 to-white/20">
        <AppHeader />
        <Outlet />
      </div>
    </div>
  );
}
