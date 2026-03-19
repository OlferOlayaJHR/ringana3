import type { ReactNode } from "react";
import { AppHeader } from "@/components/chrome/app-header";
import { AppSidebar } from "@/components/chrome/app-sidebar";
import { MobileNav } from "@/components/chrome/mobile-nav";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <div className="min-w-0 flex-1">
        <AppHeader />
        <MobileNav />
        <main className="space-y-6 px-4 py-6 sm:px-6 xl:px-8">{children}</main>
      </div>
    </div>
  );
}


