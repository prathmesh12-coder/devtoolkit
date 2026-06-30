"use client";

import * as React from "react";
import HmacMD5 from "crypto-js/hmac-md5";
import HmacSHA1 from "crypto-js/hmac-sha1";
import HmacSHA256 from "crypto-js/hmac-sha256";
import HmacSHA512 from "crypto-js/hmac-sha512";
import { Signature } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

export const meta: UtilityMeta = {
  id: "hmac-generator",
  title: "HMAC Generator",
  description: "Generate keyed-hash message authentication codes (HMAC).",
  category: "crypto",
  keywords: ["hmac", "signature", "sign", "key", "sha256", "webhook", "verify"],
  icon: Signature,
};

const fns = {
  "SHA-256": HmacSHA256,
  "SHA-1": HmacSHA1,
  "SHA-512": HmacSHA512,
  MD5: HmacMD5,
} as const;

export default function HmacGenerator() {
  const [message, setMessage] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const [algo, setAlgo] = React.useState<keyof typeof fns>("SHA-256");

  const result = React.useMemo(() => {
    if (!message || !secret) return "";
    return fns[algo](message, secret).toString();
  }, [message, secret, algo]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Secret key</Label>
          <Input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="your-secret" />
        </div>
        <div className="space-y-2">
          <Label>Algorithm</Label>
          <Select value={algo} onChange={(e) => setAlgo(e.target.value as keyof typeof fns)}>
            {Object.keys(fns).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Message</Label>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Message to sign…" />
      </div>
      <div className="rounded-md border border-border bg-card p-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium">HMAC ({algo})</span>
          <CopyButton value={result} />
        </div>
        <code className="block break-all font-mono text-sm text-muted-foreground">{result || "—"}</code>
      </div>
    </div>
  );
}
