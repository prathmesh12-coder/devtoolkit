"use client";

import * as React from "react";
import { Network } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Callout } from "@/components/tools/callout";
import { CopyButton } from "@/components/tools/copy-button";

export const meta: UtilityMeta = {
  id: "cidr-calculator",
  title: "CIDR / Subnet Calculator",
  description: "Compute network, broadcast, mask and host range for an IPv4 CIDR block.",
  category: "network",
  keywords: ["cidr", "subnet", "ip", "ipv4", "netmask", "network", "broadcast", "range"],
  icon: Network,
};

function ipToInt(ip: string): number {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    throw new Error("Invalid IPv4 address.");
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(int: number): string {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
}

function calc(cidr: string) {
  const [ip, prefixStr] = cidr.trim().split("/");
  const prefix = Number(prefixStr);
  if (prefixStr === undefined || isNaN(prefix) || prefix < 0 || prefix > 32) {
    throw new Error("Use the form 10.0.0.0/24 with a prefix of 0-32.");
  }
  const ipInt = ipToInt(ip);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = 2 ** (32 - prefix);
  const usable = prefix >= 31 ? total : total - 2;
  const firstHost = prefix >= 31 ? network : network + 1;
  const lastHost = prefix >= 31 ? broadcast : broadcast - 1;
  return {
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    netmask: intToIp(mask),
    wildcard: intToIp(~mask >>> 0),
    firstHost: intToIp(firstHost),
    lastHost: intToIp(lastHost),
    total: total.toLocaleString(),
    usable: Math.max(usable, 0).toLocaleString(),
    prefix,
  };
}

export default function CidrCalculator() {
  const [input, setInput] = React.useState("10.0.0.0/24");

  const { result, error } = React.useMemo(() => {
    try {
      return { result: calc(input), error: null as string | null };
    } catch (e) {
      return { result: null, error: (e as Error).message };
    }
  }, [input]);

  const rows = result
    ? [
        ["Network address", result.network],
        ["Broadcast address", result.broadcast],
        ["Subnet mask", result.netmask],
        ["Wildcard mask", result.wildcard],
        ["First host", result.firstHost],
        ["Last host", result.lastHost],
        ["Total addresses", result.total],
        ["Usable hosts", result.usable],
      ]
    : [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>CIDR block</Label>
        <Input value={input} onChange={(e) => setInput(e.target.value)} className="font-mono" placeholder="192.168.1.0/24" />
      </div>
      {error ? (
        <Callout tone="error">{error}</Callout>
      ) : (
        <div className="overflow-hidden rounded-md border border-border">
          {rows.map(([label, value], i) => (
            <div
              key={label}
              className={`flex items-center justify-between gap-2 px-3 py-2 ${i % 2 ? "bg-card" : "bg-muted/30"}`}
            >
              <span className="text-sm text-muted-foreground">{label}</span>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm">{value}</code>
                <CopyButton value={String(value)} label="" className="size-7 p-0" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
