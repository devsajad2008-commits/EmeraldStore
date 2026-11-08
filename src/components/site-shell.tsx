import Link from "next/link";
import { Check, Clock3, Headphones, MapPin, ShieldCheck, Truck } from "lucide-react";
import { Header } from "@/components/header";
import { ToastViewport } from "@/components/store-provider";
import { NewsletterForm } from "@/components/newsletter-form";
import { StoreLogo } from "@/components/store-logo";
import { CreatorNotice } from "@/components/creator-notice";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>
    <Header/>
    <main>{children}</main>
    <section className="benefits"><div className="container benefits-inner"><div><Truck/><span><b>ارسال مطمئن</b><small>بسته‌بندی امن و پیگیری سفارش</small></span></div><div><ShieldCheck/><span><b>تضمین اصالت کالا</b><small>خرید با خیال آسوده</small></span></div><div><Clock3/><span><b>۷ روز فرصت بازگشت</b><small>مطابق شرایط بازگشت کالا</small></span></div><div><Headphones/><span><b>پشتیبانی همراه شما</b><small>پاسخ‌گوی سوال‌های خرید</small></span></div></div></section>
    <footer className="site-footer"><div className="container"><div className="footer-main">
      <div className="footer-about"><StoreLogo footer/><p>برای خرید روزمره، انتخابی مطمئن. در امرالد استور مجموعه‌ای از کالاهای کاربردی را با اطلاعات روشن و تجربه خرید آسان کنار هم آورده‌ایم.</p><div className="footer-address"><MapPin size={16}/>تهران، خیابان بهار، فروشگاه امرالد</div></div>
      <div className="footer-links"><h3>راهنمای خرید</h3><Link href="/shipping">روش‌های ارسال</Link><Link href="/returns">شرایط بازگشت کالا</Link><Link href="/faq">پرسش‌های متداول</Link><Link href="/terms">قوانین و مقررات</Link></div>
      <div className="footer-links"><h3>خدمات مشتریان</h3><Link href="/contact">تماس با ما</Link><Link href="/about">درباره فروشگاه</Link><Link href="/profile">حساب کاربری</Link><Link href="/profile/orders">پیگیری سفارش</Link><Link href="/privacy">حریم خصوصی</Link></div>
      <div className="newsletter"><h3>خبرهای تازه و پیشنهادهای خرید</h3><p>برای دریافت پیشنهادهای منتخب، ایمیل خود را وارد کنید.</p><NewsletterForm/><small><Check size={13}/> عضویت فقط نمایشی است و ایمیلی ذخیره نمی‌شود.</small></div>
    </div><div className="footer-bottom"><span>© تمامی حقوق برای EMERALD STORE محفوظ است.</span><span>خرید آنلاین امن، آسان و شفاف <span className="gold-dot">◆</span></span></div></div></footer>
    <MobileNavigation/>
    <ToastViewport/>
    <CreatorNotice/>
  </>;
}

function MobileNavigation() {
  return <nav className="mobile-bottom-nav" aria-label="دسترسی سریع"><Link href="/"><span>⌂</span>خانه</Link><Link href="/categories"><span>▦</span>دسته‌ها</Link><Link href="/favorites"><span>♡</span>علاقه‌مندی</Link><Link href="/cart"><span>▱</span>سبد خرید</Link></nav>;
}
