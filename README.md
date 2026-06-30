# 🧰 DevToolkit

**Every small tool a DevOps or Data engineer needs — in one fast, beautiful place. No sign-up. No tracking. Nothing leaves your browser.**

Stop Googling "json pretty print online" or "base64 decode". DevToolkit puts dozens of everyday utilities and hands-on Linux / Docker / Kubernetes practice behind a single search box.

---

## ✨ What you can do

🔧 **Use 30+ instant tools** — format JSON & YAML, decode JWTs, generate hashes & passwords, calculate subnets, build `kubectl`/`curl`/Docker commands, convert timestamps, and much more.

🔍 **Find anything in a second** — press `Cmd/Ctrl + K` anywhere to fuzzy-search every tool and lesson.

🎓 **Learn by doing** — guided **Linux, Docker, and Kubernetes** lessons (beginner → advanced) with cheatsheets, a safe simulated terminal, and quick quizzes.

🔒 **Stay private** — everything runs 100% in your browser. Your data is never uploaded.

🌗 **Look good doing it** — clean, modern UI with dark & light modes.

---

## 🚀 Run it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install      # install dependencies
npm run dev      # start the app
```

Then open **http://localhost:3000** in your browser. That's it. 🎉

```bash
npm run build    # build for production
npm run start    # run the production build
```

---

## 🧭 What's inside

| Area | Examples |
| --- | --- |
| **Format & Convert** | JSON, YAML, CSV, XML, `.env` |
| **Encode & Decode** | Base64, URL, JWT, Hex, HTML entities |
| **Crypto & Hashing** | MD5/SHA, HMAC, UUID, password & secret generators |
| **Text & Data** | diff, regex tester, case converter, line tools |
| **Time & Dates** | Unix timestamp, cron explainer, timezones |
| **Network** | CIDR/subnet calculator, URL parser, HTTP status codes, chmod |
| **DevOps & Data** | `kubectl` builder, `docker run` → Compose, SQL formatter, curl builder |
| **Practice** | Linux • Docker • Kubernetes lessons |

---

## 🛠️ Built with

[Next.js](https://nextjs.org) · [TypeScript](https://www.typescriptlang.org) · [Tailwind CSS](https://tailwindcss.com) · [cmdk](https://cmdk.paco.me) · [Fuse.js](https://fusejs.io)

---

## ➕ Want to add a tool?

It takes three small steps — no framework knowledge required:

1. Create `src/utilities/<category>/<your-tool>.tsx` with your component.
2. Register it by `id` in `src/lib/tool-components.tsx`.
3. Add its info (title, description, keywords, icon) to `src/lib/registry.ts`.

It instantly shows up in search, the home page, its category, and gets its own page.

To add a **lesson**, just add an entry to `src/content/linux.ts`, `docker.ts`, or `kubernetes.ts`.

---

## ☁️ Deploy

One click with [Vercel](https://vercel.com) — import the repo and hit deploy. Every page is statically generated, so it also works on any static host.

---

Made for engineers who'd rather work than search. ⚡
