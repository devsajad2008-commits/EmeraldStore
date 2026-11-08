import Link from "next/link";
import { SearchX } from "lucide-react";
export default function NotFound() { return <div className="container not-found"><span><SearchX size={35}/></span><strong>۴۰۴</strong><h1>این صفحه پیدا نشد</h1><p>شاید نشانی اشتباه باشد یا صفحه جابه‌جا شده باشد.</p><div><Link href="/" className="button button-green">رفتن به صفحه اصلی</Link><Link href="/categories" className="button button-outline">دیدن دسته‌بندی‌ها</Link></div></div>; }
