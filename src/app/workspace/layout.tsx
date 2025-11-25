"use client";

import { Sidebar } from "@/components/workspace/Sidebar";
import { TopBar } from "@/components/workspace/TopBar";
import { ExperienceBanner } from "@/components/workspace/ExperienceBanner";
import { ReactNode } from "react";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-10 lg:px-0">
      <Sidebar />
      <div className="flex flex-1 flex-col gap-6">
        <TopBar />
        <ExperienceBanner />
        {children}
      </div>
    </div>
  );
}

