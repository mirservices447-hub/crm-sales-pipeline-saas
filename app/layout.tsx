import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "CRM Sales Pipeline", description: "Production-style CRM SaaS demo" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
