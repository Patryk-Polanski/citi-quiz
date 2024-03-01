import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import BackgroundBlob from "../ui/decorative/BackgroundBlob";

export default function AppLayout() {
  return (
    <div className="relative min-h-screen bg-sky-600 font-comfortaa text-white">
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-white/50 to-white/20">
        <AppHeader />
        <div className="container mx-auto grow">
          <Outlet />
        </div>
        <AppFooter />
        <BackgroundBlob classes="top-[200px] right-[200px] h-8 w-8" />
        <BackgroundBlob classes="top-[180px] left-[200px]" />
        <BackgroundBlob classes="bottom-[180px] right-[200px]" />
        <BackgroundBlob classes="bottom-[200px] left-[200px] h-8 w-8" />
      </div>
    </div>
  );
}
