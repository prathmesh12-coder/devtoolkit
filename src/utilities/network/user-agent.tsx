"use client";

import * as React from "react";
import { MonitorSmartphone } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ExampleBar } from "@/components/tools/example-bar";

const SAMPLE =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export const meta: UtilityMeta = {
  id: "user-agent-parser",
  title: "User-Agent Parser",
  description: "Break down a browser User-Agent string into browser, engine, and OS.",
  category: "network",
  keywords: ["user-agent", "ua", "browser", "parse", "os", "device", "http"],
  icon: MonitorSmartphone,
};

function detect(ua: string) {
  const out: { label: string; value: string }[] = [];
  const browser =
    /Edg\/([\d.]+)/.exec(ua) ? `Edge ${/Edg\/([\d.]+)/.exec(ua)![1]}` :
    /OPR\/([\d.]+)/.exec(ua) ? `Opera ${/OPR\/([\d.]+)/.exec(ua)![1]}` :
    /Firefox\/([\d.]+)/.exec(ua) ? `Firefox ${/Firefox\/([\d.]+)/.exec(ua)![1]}` :
    /Chrome\/([\d.]+)/.exec(ua) ? `Chrome ${/Chrome\/([\d.]+)/.exec(ua)![1]}` :
    /Version\/([\d.]+).*Safari/.exec(ua) ? `Safari ${/Version\/([\d.]+)/.exec(ua)![1]}` :
    "Unknown";

  const os =
    /Windows NT 10/.test(ua) ? "Windows 10/11" :
    /Windows NT ([\d.]+)/.exec(ua) ? `Windows NT ${/Windows NT ([\d.]+)/.exec(ua)![1]}` :
    /Mac OS X ([\d_]+)/.exec(ua) ? `macOS ${/Mac OS X ([\d_]+)/.exec(ua)![1].replace(/_/g, ".")}` :
    /Android ([\d.]+)/.exec(ua) ? `Android ${/Android ([\d.]+)/.exec(ua)![1]}` :
    /iPhone OS ([\d_]+)/.exec(ua) ? `iOS ${/iPhone OS ([\d_]+)/.exec(ua)![1].replace(/_/g, ".")}` :
    /Linux/.test(ua) ? "Linux" :
    "Unknown";

  const engine =
    /Gecko\/|rv:/.test(ua) && /Firefox/.test(ua) ? "Gecko" :
    /AppleWebKit\/([\d.]+)/.exec(ua) ? `WebKit/Blink ${/AppleWebKit\/([\d.]+)/.exec(ua)![1]}` :
    "Unknown";

  const device = /Mobi|Android|iPhone|iPad/.test(ua) ? (/iPad|Tablet/.test(ua) ? "Tablet" : "Mobile") : "Desktop";

  out.push({ label: "Browser", value: browser });
  out.push({ label: "Engine", value: engine });
  out.push({ label: "Operating system", value: os });
  out.push({ label: "Device type", value: device });
  out.push({ label: "Bot / crawler", value: /bot|crawl|spider|slurp/i.test(ua) ? "Likely yes" : "No" });
  return out;
}

export default function UserAgentParser() {
  const [ua, setUa] = React.useState("");

  React.useEffect(() => {
    if (typeof navigator !== "undefined" && !ua) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUa(navigator.userAgent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = ua.trim() ? detect(ua) : [];

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={() => setUa(SAMPLE)}
        note={<>a raw UA string is broken down into browser, engine, OS and device type.</>}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>User-Agent string</Label>
          {typeof navigator !== "undefined" && (
            <Button variant="ghost" size="sm" onClick={() => setUa(navigator.userAgent)}>
              Use mine
            </Button>
          )}
        </div>
        <Textarea value={ua} onChange={(e) => setUa(e.target.value)} rows={3} placeholder="Mozilla/5.0 (…) …" />
      </div>
      {rows.length > 0 && (
        <div className="overflow-hidden rounded-md border border-border">
          {rows.map((r, i) => (
            <div key={r.label} className={`flex justify-between gap-2 px-3 py-2 ${i % 2 ? "bg-card" : "bg-muted/30"}`}>
              <span className="text-sm text-muted-foreground">{r.label}</span>
              <code className="font-mono text-sm">{r.value}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
