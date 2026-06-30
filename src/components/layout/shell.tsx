import * as React from "react";
import { SiteSidebar } from "./site-sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-20">
          <SiteSidebar />
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
