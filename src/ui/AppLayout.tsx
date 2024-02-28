import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";

export default function AppLayout() {
  return (
    <div className="relative min-h-screen bg-sky-600 font-comfortaa text-white">
      <div className="min-h-screen bg-gradient-to-br from-white/50 to-white/20">
        <AppHeader />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
