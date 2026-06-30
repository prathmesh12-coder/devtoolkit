/** Short explainer shown on each tool page (1–2 sentences). */
export const toolHowItWorks: Record<string, string> = {
  "json-formatter":
    "Paste minified or messy JSON, then pretty-print to add indentation and line breaks, or minify to shrink it for APIs and logs. Invalid JSON shows a clear parse error so you can fix syntax quickly.",
  "yaml-json":
    "Paste YAML (common for Kubernetes manifests and CI configs) or JSON and convert in either direction. Handy when you need JSON for an API but have a YAML file, or the reverse.",
  "json-csv":
    "Provide a JSON array of objects to get a spreadsheet-friendly CSV with a header row, or paste CSV to rebuild a JSON array. Useful for quick exports and imports without opening Excel.",
  "xml-formatter":
    "Paste one-line or messy XML to pretty-print with consistent indentation, or minify to remove whitespace. The formatter checks basic XML structure and reports parse issues.",
  "dotenv-json":
    "Turn a .env file into a JSON object for scripts and configs, or generate .env lines from JSON. Comments and quoted values in .env files are handled automatically.",

  base64:
    "Encode any text (including emoji and non-Latin characters) into Base64, or decode Base64 back to the original string. Everything stays in your browser — safe for tokens and small secrets.",
  "url-encode":
    "Percent-encode special characters in URLs and query strings so they are safe to transmit, or decode encoded strings back to readable text. Use component mode for individual query values.",
  "jwt-decoder":
    "Paste a JWT to inspect its header and payload as readable JSON, including common claims like exp and sub. This tool decodes only — it does not verify the signature.",
  "html-entities":
    "Escape characters like <, >, and & for safe HTML output, or unescape entity codes back to plain text. Useful when embedding user content in templates or debugging escaped strings.",
  "hex-text":
    "View text as space-separated hex bytes (UTF-8), or convert hex back to readable text. Helpful for debugging binary protocols, firmware dumps, and encoded payloads.",
  "number-base":
    "Enter a number in binary, octal, decimal, or hex and see the equivalent in every other base instantly. Handy for low-level debugging, masks, and permission bits.",

  "hash-generator":
    "Type or paste text to compute MD5, SHA-1, SHA-256, and SHA-512 digests at once. Hashes are one-way fingerprints — the same input always produces the same output.",
  "hmac-generator":
    "Combine a secret key with a message to produce an HMAC signature, often used to verify webhooks and API requests. Pick the hash algorithm your service expects (usually SHA-256).",
  "uuid-generator":
    "Generate random UUID v4 identifiers in bulk for database keys, correlation IDs, or test data. Each ID is statistically unique and ready to copy.",
  "password-generator":
    "Build strong random passwords by choosing length and character sets (upper, lower, digits, symbols). Uses the browser's crypto API — nothing is sent to a server.",
  "k8s-secret":
    "Encode plain text into Base64 for a Kubernetes Secret's data field, or decode an existing value. Prefer stringData in manifests when you want to avoid manual encoding.",

  "text-diff":
    "Paste an original and a changed version side by side to see added lines in green and removed lines in red. Ideal for config diffs, log comparisons, and quick reviews.",
  "regex-tester":
    "Write a JavaScript regex, pick flags, and test against sample text with live highlighting and match details. See capture groups for each match as you type.",
  "case-converter":
    "Enter any phrase once and get camelCase, snake_case, kebab-case, CONSTANT_CASE, and more in parallel. Copy the style your codebase or API expects.",
  "line-tools":
    "Paste a list of lines and sort, deduplicate, reverse, shuffle, or trim empty entries in one click. Common for cleaning log exports and inventory lists.",
  slugify:
    "Turn titles or arbitrary text into URL-safe slugs by lowercasing, removing accents, and replacing spaces with hyphens or underscores. Perfect for blog permalinks and file names.",
  "text-counter":
    "Counts characters, words, lines, sentences, and UTF-8 bytes as you type. Useful for tweet limits, SEO snippets, and payload size checks.",
  "string-escape":
    "Convert raw text with newlines and quotes into escaped strings ready for JSON or JavaScript, or unescape an escaped string back to plain text.",
  "lorem-ipsum":
    "Generate placeholder paragraphs, sentences, or words for mockups and documentation. Refresh until you have the amount of filler text you need.",

  "unix-timestamp":
    "Convert Unix epoch seconds (or milliseconds) to human-readable dates and back. Shows ISO, UTC, and local time formats plus a live clock for the current epoch.",
  "cron-explainer":
    "Type a five-field cron expression and read it in plain English, or pick a common pattern to learn the syntax. Great when debugging crontab and scheduler configs.",
  "timezone-converter":
    "Pick a local date and time once and see that exact moment across major world timezones. Helps when coordinating deploys and on-call handoffs across regions.",
  "duration-converter":
    "Enter a duration in any unit (seconds through weeks) and see equivalents everywhere, plus a human-readable form like 1h 1m 1s.",

  "cidr-calculator":
    "Enter an IPv4 CIDR block (e.g. 10.0.0.0/24) to get network, broadcast, mask, wildcard, and usable host range. Essential for VPC planning and firewall rules.",
  "url-parser":
    "Paste a full URL to break it into protocol, credentials, host, port, path, query parameters, and hash. Handy when debugging redirects and API endpoints.",
  "http-status":
    "Search HTTP status codes by number or keyword to recall what 404, 502, or 429 mean in production. Includes common REST and proxy responses.",
  "chmod-calculator":
    "Toggle read, write, and execute for owner, group, and others to see octal (644) and symbolic (rw-r--r--) permissions update live. Copy the chmod command when done.",
  "user-agent-parser":
    "Paste a User-Agent header to guess browser, rendering engine, OS, and device type. Useful for support tickets and analytics debugging.",

  "kubectl-builder":
    "Fill in action, resource, name, namespace, and output format to assemble a kubectl command without memorizing flags. Copy the result straight into your terminal.",
  "docker-run-to-compose":
    "Paste a docker run command and get an equivalent docker-compose.yml service with ports, env, volumes, and networks mapped. Updates live as you edit the command.",
  "sql-formatter":
    "Paste a cramped SQL query and format it with consistent indentation and uppercase keywords. Supports dialects like PostgreSQL, Spark, and BigQuery.",
  "byte-converter":
    "Convert data sizes between decimal (KB, MB, GB) and binary (KiB, MiB, GiB) units from a single value. Clarifies the 1000 vs 1024 confusion.",
  "curl-builder":
    "Set HTTP method, URL, headers, and body to build a curl command with proper quoting. Copy and run it in your shell to test APIs quickly.",
  "gitignore-generator":
    "Select language and tooling presets (Node, Python, Terraform, etc.) to merge their ignore rules into one .gitignore file ready to commit.",
};

export function getToolHowItWorks(id: string): string | undefined {
  return toolHowItWorks[id];
}
