import { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export default function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <section className="bg-slate-100">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        <section className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
          <main className="min-h-[100vh-200px]">
            <div className="mx-auto max-w-screen-2xl md:p-6">
              <Outlet />
            </div>
          </main>
        </section>
      </div>
    </section>
  );
}
