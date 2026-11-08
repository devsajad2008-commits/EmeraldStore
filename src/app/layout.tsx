import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";
import { SiteShell } from "@/components/site-shell";
import { storeName } from "@/data/store";
import { siteUrl } from "@/data/site-url";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${storeName} | خرید آنلاین کالاهای منتخب`, template: `%s | ${storeName}` },
  description: "خرید آنلاین کالاهای متنوع از کالای دیجیتال تا خانه، مد و پوشاک، با تجربه‌ای ساده و مطمئن.",
  applicationName: storeName,
  openGraph: { title: storeName, description: "انتخاب‌های روزمره، یک خرید مطمئن", locale: "fa_IR", type: "website", images: ["/images/og/pages/home.webp"] },
  icons: { icon: "/images/branding/store-icon.svg", apple: "/images/branding/store-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl"><body><StoreProvider><SiteShell>{children}</SiteShell></StoreProvider></body></html>;
}
