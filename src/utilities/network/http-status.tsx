"use client";

import * as React from "react";
import { ServerCog } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ExampleBar } from "@/components/tools/example-bar";

export const meta: UtilityMeta = {
  id: "http-status",
  title: "HTTP Status Codes",
  description: "Searchable reference of HTTP response status codes and their meanings.",
  category: "network",
  keywords: ["http", "status", "code", "response", "404", "500", "reference"],
  icon: ServerCog,
};

const CODES: { code: number; name: string; desc: string }[] = [
  { code: 100, name: "Continue", desc: "Request received, continue sending the body." },
  { code: 101, name: "Switching Protocols", desc: "Server is switching protocols as requested." },
  { code: 200, name: "OK", desc: "The request succeeded." },
  { code: 201, name: "Created", desc: "Request succeeded and a new resource was created." },
  { code: 202, name: "Accepted", desc: "Request accepted for processing, not yet completed." },
  { code: 204, name: "No Content", desc: "Success, but there is no body to return." },
  { code: 206, name: "Partial Content", desc: "Partial response delivered for a range request." },
  { code: 301, name: "Moved Permanently", desc: "Resource permanently moved to a new URL." },
  { code: 302, name: "Found", desc: "Resource temporarily at a different URL." },
  { code: 304, name: "Not Modified", desc: "Cached version is still valid." },
  { code: 307, name: "Temporary Redirect", desc: "Repeat the request to a new URL, keep the method." },
  { code: 308, name: "Permanent Redirect", desc: "Permanent redirect, keep the method." },
  { code: 400, name: "Bad Request", desc: "The server could not understand the request." },
  { code: 401, name: "Unauthorized", desc: "Authentication is required or failed." },
  { code: 403, name: "Forbidden", desc: "Authenticated but not allowed to access." },
  { code: 404, name: "Not Found", desc: "The requested resource does not exist." },
  { code: 405, name: "Method Not Allowed", desc: "HTTP method is not supported for this resource." },
  { code: 408, name: "Request Timeout", desc: "The server timed out waiting for the request." },
  { code: 409, name: "Conflict", desc: "Request conflicts with the current server state." },
  { code: 410, name: "Gone", desc: "The resource is permanently unavailable." },
  { code: 413, name: "Payload Too Large", desc: "The request body is larger than allowed." },
  { code: 415, name: "Unsupported Media Type", desc: "The payload format is not supported." },
  { code: 418, name: "I'm a teapot", desc: "Refuses to brew coffee with a teapot (RFC 2324)." },
  { code: 422, name: "Unprocessable Entity", desc: "Semantic errors prevented processing." },
  { code: 429, name: "Too Many Requests", desc: "Rate limit exceeded, slow down." },
  { code: 500, name: "Internal Server Error", desc: "A generic server-side error occurred." },
  { code: 501, name: "Not Implemented", desc: "The server does not support the functionality." },
  { code: 502, name: "Bad Gateway", desc: "Invalid response from an upstream server." },
  { code: 503, name: "Service Unavailable", desc: "Server is overloaded or down for maintenance." },
  { code: 504, name: "Gateway Timeout", desc: "Upstream server failed to respond in time." },
];

function toneFor(code: number) {
  if (code < 200) return "secondary" as const;
  if (code < 300) return "success" as const;
  if (code < 400) return "default" as const;
  if (code < 500) return "warning" as const;
  return "destructive" as const;
}

export default function HttpStatus() {
  const [q, setQ] = React.useState("");
  const filtered = CODES.filter(
    (c) => `${c.code} ${c.name} ${c.desc}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={() => setQ("404")}
        note={<>search <code>404</code> to find &ldquo;Not Found&rdquo;, or type a keyword like <code>timeout</code>.</>}
      />
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by code or name (e.g. 404, timeout)…" />
      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c.code} className="flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2">
            <Badge variant={toneFor(c.code)} className="mt-0.5 tabular-nums">
              {c.code}
            </Badge>
            <div>
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-sm text-muted-foreground">{c.desc}</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No matching status codes.</p>}
      </div>
    </div>
  );
}
