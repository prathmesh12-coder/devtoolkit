"use client";

import * as React from "react";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { getSearchItems, type SearchItem } from "@/lib/search";
import { addRecent } from "@/lib/recent";

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const items = React.useMemo(() => getSearchItems(), []);
  const fuse = React.useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 3 },
          { name: "keywords", weight: 2 },
          { name: "description", weight: 1 },
          { name: "group", weight: 1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [items]
  );

  const results = React.useMemo(() => {
    if (!query.trim()) return items;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, items]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of results.slice(0, 60)) {
      const arr = map.get(item.group) ?? [];
      arr.push(item);
      map.set(item.group, arr);
    }
    return Array.from(map.entries());
  }, [results]);

  function onSelect(item: SearchItem) {
    addRecent(item.href);
    setOpen(false);
    setQuery("");
    router.push(item.href);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <Command
        shouldFilter={false}
        loop
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search tools and lessons…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>
          {grouped.map(([group, groupItems]) => (
            <Command.Group
              key={group}
              heading={group}
              className="mb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {groupItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Command.Item
                    key={item.id}
                    value={item.id}
                    onSelect={() => onSelect(item)}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm aria-selected:bg-secondary"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium">{item.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}
