"use client";

import * as React from "react";
import { addRecent } from "@/lib/recent";

export function TrackRecent({ href }: { href: string }) {
  React.useEffect(() => {
    addRecent(href);
  }, [href]);
  return null;
}
