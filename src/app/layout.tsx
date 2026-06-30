import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchProvider } from "@/components/search/search-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevToolkit — Utilities & Practice for DevOps and Big Data",
    template: "%s — DevToolkit",
  },
  description:
    "A fast, privacy-first collection of everyday utilities for DevOps and Big Data engineers, plus guided Linux, Docker, and Kubernetes practice. Everything runs in your browser.",
  keywords: [
    "devops tools",
    "json formatter",
    "base64",
    "jwt decoder",
    "kubectl",
    "docker",
    "kubernetes",
    "linux commands",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SearchProvider>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
