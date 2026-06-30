import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          DevToolkit — fast utilities for DevOps & Big Data engineers. Everything runs in your browser.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/tools" className="transition-colors hover:text-foreground">
            All tools
          </Link>
          <Link href="/practice" className="transition-colors hover:text-foreground">
            Practice
          </Link>
        </div>
      </div>
    </footer>
  );
}
