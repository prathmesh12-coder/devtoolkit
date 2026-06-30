import {
  Braces,
  ArrowRightLeft,
  Table,
  Code2,
  FileCog,
  Binary,
  Link2,
  KeyRound,
  CodeXml,
  Hash,
  Fingerprint,
  Signature,
  KeySquare,
  Lock,
  GitCompare,
  Regex,
  CaseSensitive,
  ListOrdered,
  Link,
  Calculator,
  Clock,
  CalendarClock,
  Globe,
  Network,
  ServerCog,
  FileLock2,
  Ship,
  Container,
  Database,
  HardDrive,
  TerminalSquare,
} from "lucide-react";
import type { UtilityMeta, CategoryId } from "./types";

/**
 * Server-safe metadata for every utility. This is the single source of truth
 * for search, navigation, and static-params generation. The interactive
 * component for each tool is resolved separately in tool-components.tsx
 * (a client module) because "use client" exports cannot be read on the server.
 *
 * To add a tool: add an entry here and a matching component in tool-components.tsx.
 */
export const utilities: UtilityMeta[] = [
  // Format & Convert
  { id: "json-formatter", title: "JSON Formatter & Validator", description: "Pretty-print, minify and validate JSON with helpful error messages.", category: "format", keywords: ["json", "pretty", "print", "beautify", "minify", "validate", "format"], icon: Braces },
  { id: "yaml-json", title: "YAML ↔ JSON Converter", description: "Convert between YAML and JSON in both directions. Great for k8s manifests.", category: "format", keywords: ["yaml", "json", "convert", "kubernetes", "manifest", "yml"], icon: ArrowRightLeft },
  { id: "json-csv", title: "JSON ↔ CSV Converter", description: "Turn an array of JSON objects into CSV, and parse CSV back into JSON.", category: "format", keywords: ["json", "csv", "convert", "spreadsheet", "table", "export"], icon: Table },
  { id: "xml-formatter", title: "XML Formatter", description: "Pretty-print and minify XML documents with consistent indentation.", category: "format", keywords: ["xml", "format", "pretty", "beautify", "minify", "indent"], icon: Code2 },
  { id: "dotenv-json", title: ".env ↔ JSON Converter", description: "Convert environment files to a JSON object and back.", category: "format", keywords: ["env", "dotenv", "json", "environment", "variables", "config"], icon: FileCog },

  // Encode & Decode
  { id: "base64", title: "Base64 Encode / Decode", description: "Encode text to Base64 and decode it back, with full UTF-8 support.", category: "encode", keywords: ["base64", "encode", "decode", "b64", "atob", "btoa"], icon: Binary },
  { id: "url-encode", title: "URL Encode / Decode", description: "Percent-encode and decode URL components and query strings.", category: "encode", keywords: ["url", "encode", "decode", "percent", "uri", "query", "escape"], icon: Link2 },
  { id: "jwt-decoder", title: "JWT Decoder", description: "Decode JSON Web Token header and payload and inspect claims (no verification).", category: "encode", keywords: ["jwt", "token", "decode", "json web token", "auth", "claims", "bearer"], icon: KeyRound },
  { id: "html-entities", title: "HTML Entity Encode / Decode", description: "Escape and unescape HTML special characters like < > & \" '.", category: "encode", keywords: ["html", "entities", "escape", "unescape", "encode", "decode", "ampersand"], icon: CodeXml },
  { id: "hex-text", title: "Hex ↔ Text Converter", description: "Convert text to hexadecimal bytes and back (UTF-8).", category: "encode", keywords: ["hex", "hexadecimal", "text", "ascii", "bytes", "encode", "decode"], icon: Hash },

  // Crypto & Hashing
  { id: "hash-generator", title: "Hash Generator", description: "Compute MD5, SHA-1, SHA-256 and SHA-512 digests of any text.", category: "crypto", keywords: ["hash", "md5", "sha1", "sha256", "sha512", "digest", "checksum"], icon: Fingerprint },
  { id: "hmac-generator", title: "HMAC Generator", description: "Generate keyed-hash message authentication codes (HMAC).", category: "crypto", keywords: ["hmac", "signature", "sign", "key", "sha256", "webhook", "verify"], icon: Signature },
  { id: "uuid-generator", title: "UUID Generator", description: "Generate random RFC 4122 version 4 UUIDs in bulk.", category: "crypto", keywords: ["uuid", "guid", "v4", "id", "identifier", "random", "generate"], icon: Fingerprint },
  { id: "password-generator", title: "Password & Token Generator", description: "Generate cryptographically strong passwords and API tokens.", category: "crypto", keywords: ["password", "token", "secret", "random", "generate", "secure", "api key"], icon: KeySquare },
  { id: "k8s-secret", title: "Kubernetes Secret Encoder", description: "Base64-encode and decode values for Kubernetes Secret manifests.", category: "crypto", keywords: ["kubernetes", "k8s", "secret", "base64", "encode", "decode", "manifest"], icon: Lock },

  // Text & Data
  { id: "text-diff", title: "Text Diff Viewer", description: "Compare two blocks of text and highlight added and removed lines.", category: "text", keywords: ["diff", "compare", "text", "changes", "patch", "difference"], icon: GitCompare },
  { id: "regex-tester", title: "Regex Tester", description: "Test JavaScript regular expressions live and inspect every match and group.", category: "text", keywords: ["regex", "regular expression", "match", "test", "pattern", "groups"], icon: Regex },
  { id: "case-converter", title: "Case Converter", description: "Convert text between camelCase, snake_case, kebab-case, CONSTANT_CASE and more.", category: "text", keywords: ["case", "camel", "snake", "kebab", "pascal", "upper", "lower", "title"], icon: CaseSensitive },
  { id: "line-tools", title: "Line Tools (Sort / Dedupe / Trim)", description: "Sort, deduplicate, reverse, shuffle and trim lines of text.", category: "text", keywords: ["sort", "dedupe", "unique", "lines", "trim", "reverse", "shuffle"], icon: ListOrdered },
  { id: "slugify", title: "Slugify", description: "Turn any text into a clean, URL-friendly slug.", category: "text", keywords: ["slug", "slugify", "url", "permalink", "seo", "kebab"], icon: Link },
  { id: "text-counter", title: "Word & Character Counter", description: "Count characters, words, lines, and bytes in any text.", category: "text", keywords: ["count", "characters", "words", "lines", "bytes", "length"], icon: Calculator },

  // Time & Dates
  { id: "unix-timestamp", title: "Unix Timestamp Converter", description: "Convert between Unix epoch timestamps and human-readable dates.", category: "time", keywords: ["unix", "timestamp", "epoch", "date", "time", "convert", "iso"], icon: Clock },
  { id: "cron-explainer", title: "Cron Expression Explainer", description: "Translate cron schedules into plain English and test common patterns.", category: "time", keywords: ["cron", "crontab", "schedule", "expression", "explain", "job"], icon: CalendarClock },
  { id: "timezone-converter", title: "Timezone Converter", description: "See a moment in time across major timezones around the world.", category: "time", keywords: ["timezone", "utc", "convert", "time", "world clock", "offset"], icon: Globe },

  // Network
  { id: "cidr-calculator", title: "CIDR / Subnet Calculator", description: "Compute network, broadcast, mask and host range for an IPv4 CIDR block.", category: "network", keywords: ["cidr", "subnet", "ip", "ipv4", "netmask", "network", "broadcast", "range"], icon: Network },
  { id: "url-parser", title: "URL Parser", description: "Break a URL into protocol, host, path, and query parameters.", category: "network", keywords: ["url", "parse", "query", "params", "host", "path", "components"], icon: Link2 },
  { id: "http-status", title: "HTTP Status Codes", description: "Searchable reference of HTTP response status codes and their meanings.", category: "network", keywords: ["http", "status", "code", "response", "404", "500", "reference"], icon: ServerCog },
  { id: "chmod-calculator", title: "chmod Calculator", description: "Convert between octal, symbolic and checkbox file permissions.", category: "network", keywords: ["chmod", "permissions", "octal", "symbolic", "linux", "file", "rwx"], icon: FileLock2 },

  // DevOps & Data
  { id: "kubectl-builder", title: "kubectl Command Builder", description: "Assemble common kubectl commands from a simple form.", category: "devops", keywords: ["kubectl", "kubernetes", "k8s", "command", "builder", "get", "logs"], icon: Ship },
  { id: "docker-run-to-compose", title: "docker run → Compose", description: "Convert a docker run command into a docker-compose.yml service definition.", category: "devops", keywords: ["docker", "compose", "run", "convert", "yaml", "container"], icon: Container },
  { id: "sql-formatter", title: "SQL Formatter", description: "Beautify and standardize SQL queries across many dialects.", category: "devops", keywords: ["sql", "format", "beautify", "query", "pretty", "spark", "presto", "postgres"], icon: Database },
  { id: "byte-converter", title: "Data Size Converter", description: "Convert between bytes, KB/MB/GB/TB and binary KiB/MiB/GiB units.", category: "devops", keywords: ["bytes", "size", "data", "kb", "mb", "gb", "tb", "kib", "mib", "convert"], icon: HardDrive },
  { id: "curl-builder", title: "curl Command Builder", description: "Build a curl command with method, headers, and a request body.", category: "devops", keywords: ["curl", "http", "request", "api", "headers", "command", "builder"], icon: TerminalSquare },
];

export const utilityMap: Map<string, UtilityMeta> = new Map(
  utilities.map((u) => [u.id, u])
);

export function getUtility(id: string): UtilityMeta | undefined {
  return utilityMap.get(id);
}

export function getUtilitiesByCategory(category: CategoryId): UtilityMeta[] {
  return utilities.filter((u) => u.category === category);
}
