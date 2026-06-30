const KEY = "dtk:recent";
const MAX = 8;

export function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecent(href: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getRecent().filter((h) => h !== href);
    current.unshift(href);
    localStorage.setItem(KEY, JSON.stringify(current.slice(0, MAX)));
    window.dispatchEvent(new Event("dtk:recent-changed"));
  } catch {
    /* ignore */
  }
}
