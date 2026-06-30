"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { categories } from "@/lib/categories";
import { tracks } from "@/lib/lessons";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  active,
  icon: Icon,
  children,
}: {
  href: string;
  active: boolean;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-secondary font-medium text-foreground"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{children}</span>
    </Link>
  );
}

export function SiteSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6">
      <div>
        <NavLink href="/tools" active={pathname === "/tools"} icon={LayoutGrid}>
          All tools
        </NavLink>
      </div>
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Categories
        </p>
        <div className="flex flex-col gap-0.5">
          {categories.map((c) => (
            <NavLink
              key={c.id}
              href={`/categories/${c.id}`}
              active={pathname === `/categories/${c.id}`}
              icon={c.icon}
            >
              {c.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Practice
        </p>
        <div className="flex flex-col gap-0.5">
          {tracks.map((t) => (
            <NavLink
              key={t.id}
              href={`/practice/${t.id}`}
              active={pathname.startsWith(`/practice/${t.id}`)}
              icon={t.icon}
            >
              {t.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
