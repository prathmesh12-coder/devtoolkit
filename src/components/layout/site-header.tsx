"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Terminal, Menu } from "lucide-react";
import { useSearch } from "@/components/search/search-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader({ onMenu }: { onMenu?: () => void }) {
  const { setOpen } = useSearch();
  const [mac, setMac] = React.useState(true);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        {onMenu && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
        )}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Terminal className="size-4" />
          </span>
          <span className="hidden sm:inline">DevToolkit</span>
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="group ml-2 flex h-9 flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-ring/60 sm:max-w-md"
        >
          <Search className="size-4" />
          <span className="flex-1 text-left">Search tools and lessons…</span>
          <kbd className="hidden items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[10px] sm:inline-flex">
            {mac ? "⌘" : "Ctrl"} K
          </kbd>
        </button>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Link href="/tools" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Tools
          </Link>
          <Link href="/practice" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Practice
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
