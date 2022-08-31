import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Navbar } from "../components/Navbar/Navbar";
import { useWindowSize } from "../hooks/useWindowSize";

export const MainLayout = () => {
  const { width } = useWindowSize();
  const [mobileView, setMobileView] = useState<boolean>(width < 768);

  useEffect(() => {
    setMobileView(width < 768);
  }, [width]);

  return (
    <div className="flex flex-col min-h-screen font-montserrat">
      {mobileView ? (
        <div className="sticky w-full flex flex-row justify-around py-2 shadow-xl shadow-primary-500/10 bg-white">
          <Logo className="h-11" />
        </div>
      ) : (
        <Navbar />
      )}
      <div className="min-h-screen">
        <Outlet />
      </div>
      {mobileView && <Navbar mobileView />}
    </div>
  );
};
