"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CircleAlert, RotateCcw } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Storefront rendering error:", error);
  }, [error]);
  return <div className="container not-found"><span><CircleAlert size={32}/></span><h1>بارگذاری صفحه با مشکل روبه‌رو شد</h1><p>لطفاً دوباره تلاش کنید یا به صفحه اصلی فروشگاه برگردید.</p><div><button className="button button-green" onClick={reset}><RotateCcw size={16}/> تلاش دوباره</button><Link href="/" className="button button-outline">صفحه اصلی</Link></div></div>;
}
