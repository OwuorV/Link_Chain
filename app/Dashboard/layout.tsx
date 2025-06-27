"use client";
import { useState } from "react";
import Dashboardnav from "../ui/dashboard/dashboardnav";
import DashboardMain from "../ui/dashboard/dashboardMain";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <div className="flex justify-between h-full mt-5">
      <Dashboardnav visible={showSideNav} />
      <main className="flex w-full h-full">
        <DashboardMain toggle={() => setShowSideNav(!showSideNav)}>
          {children}
        </DashboardMain>
      </main>
    </div>
  );
}
