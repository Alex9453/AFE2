"use client";

import SideNav from "../ui/dashboard/sidenav";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidenav">
        <SideNav role="client" />
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
