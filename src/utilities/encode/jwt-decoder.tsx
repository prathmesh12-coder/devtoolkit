"use client";

import * as React from "react";
import { KeyRound } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { EditorPanel } from "@/components/tools/editor-panel";
import { Callout } from "@/components/tools/callout";
import { Textarea } from "@/components/ui/textarea";

export const meta: UtilityMeta = {
  id: "jwt-decoder",
  title: "JWT Decoder",
  description: "Decode JSON Web Token header and payload and inspect claims (no verification).",
  category: "encode",
  keywords: ["jwt", "token", "decode", "json web token", "auth", "claims", "bearer"],
  icon: KeyRound,
};

function b64urlDecode(part: string): string {
  const pad = part.length % 4 === 0 ? "" : "=".repeat(4 - (part.length % 4));
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function pretty(json: string): string {
  return JSON.stringify(JSON.parse(json), null, 2);
}

export default function JwtDecoder() {
  const [token, setToken] = React.useState("");

  const { header, payload, error, expiry } = React.useMemo(() => {
    if (!token.trim()) return { header: "", payload: "", error: null as string | null, expiry: null as string | null };
    try {
      const parts = token.trim().replace(/^Bearer\s+/i, "").split(".");
      if (parts.length < 2) throw new Error("A JWT has three dot-separated parts.");
      const payloadJson = b64urlDecode(parts[1]);
      const claims = JSON.parse(payloadJson);
      let expiry: string | null = null;
      if (claims.exp) {
        const date = new Date(claims.exp * 1000);
        // eslint-disable-next-line react-hooks/purity
        const expired = date.getTime() < Date.now();
        expiry = `${expired ? "Expired" : "Expires"} ${date.toLocaleString()}`;
      }
      return {
        header: pretty(b64urlDecode(parts[0])),
        payload: pretty(payloadJson),
        error: null as string | null,
        expiry,
      };
    } catch (e) {
      return { header: "", payload: "", error: (e as Error).message, expiry: null as string | null };
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">Encoded token</span>
        <Textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          placeholder="eyJhbGciOi…"
        />
      </div>

      {error && <Callout tone="error">{error}</Callout>}
      {expiry && (
        <Callout tone={expiry.startsWith("Expired") ? "error" : "success"}>{expiry}</Callout>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Header" value={header} readOnly copy rows={10} />
        <EditorPanel label="Payload" value={payload} readOnly copy rows={10} />
      </div>
      <Callout tone="info">
        Decoding only. This tool does not verify the signature, so never trust an unverified token in production.
      </Callout>
    </div>
  );
}
