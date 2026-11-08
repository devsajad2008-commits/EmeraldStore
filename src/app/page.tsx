import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BadgePercent, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { products, discountedProducts } from "@/data/products";
import { CategoryGrid } from "@/components/category-card";
import { ProductSection, ProductGrid } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { HeroSlider } from "@/components/hero-slider";

export default function Home() {
  return <>
    <HeroSlider/>
    <section className="container section category-section"><div className="section-heading"><div><span className="eyebrow">از هر چیزی، کمی بیشتر</span><h2>دسته‌بندی‌های فروشگاه</h2></div><Link href="/categories" className="view-all">همه دسته‌ها <ArrowLeft size={16}/></Link></div><CategoryGrid items={categories}/></section>
    <section className="container deal-banner"><Image src="/images/banners/home-featured-deals.webp" alt="" fill sizes="100vw" className="deal-banner-image"/><div className="deal-copy"><span><BadgePercent size={16}/> انتخاب‌های محدود امروز</span><h2>پیشنهادهای ویژه<br/>برای خرید هوشمندانه</h2><p>کالاهای منتخب با تخفیف‌های به‌صرفه، تا پایان موجودی.</p><Link className="button button-light" href="/deals">دیدن پیشنهادها <ArrowLeft size={17}/></Link></div><div className="deal-stamp"><b>تا</b><strong>۳۰٪</strong><small>تخفیف منتخب</small></div></section>
    <ProductSection title="پیشنهادهای شگفت‌انگیز" subtitle="قیمت‌های جذاب امروز" items={discountedProducts.slice(0, 5)} href="/deals" tone="featured-products"/>
    <section className="container editorial-banner"><Image src="/images/banners/home-kitchen-banner.webp" alt="" fill sizes="100vw" className="editorial-banner-image"/><div className="editorial-icon"><Sparkles size={26}/></div><div><span className="eyebrow">برای خانه‌ای گرم‌تر</span><h2>انتخاب‌هایی برای خانه شما</h2><p>لوازم کاربردی و زیبا برای لحظه‌های روزمره.</p></div><Link href="/category/home-kitchen" className="button button-outline">کشف محصولات خانه <ArrowLeft size={17}/></Link></section>
    <ProductSection title="پرفروش‌ترین کالاهای این هفته" subtitle="محبوب میان خریداران" items={products.filter((product) => product.isBestSeller).slice(0, 5)} href="/bestsellers"/>
    <ProductSection title="جدیدترین محصولات فروشگاه" subtitle="تازه رسیده‌اند" items={products.filter((product) => product.isNew).slice(0, 5)} href="/new-arrivals"/>
    <section className="container brand-strip"><div><span className="eyebrow">نام‌های آشنا</span><h2>برندهای محبوب</h2></div><div className="brand-list"><span>Samsung</span><span>PHILIPS</span><span>adidas</span><span>xiaomi</span><span>Canon</span><span>ASUS</span></div></section>
    <section className="container economical"><div className="economical-head"><div><span className="eyebrow">انتخاب اقتصادی</span><h2>محصولات منتخب با قیمت مناسب</h2><p>کیفیت کاربردی برای خریدهای هر روز</p></div><Link href="/deals" className="button button-outline">همه کالاهای اقتصادی <ArrowLeft size={17}/></Link></div><ProductGrid items={products.filter((product) => product.price < 1000000).slice(0, 4)}/></section>
    <section className="container testimonial"><div><span className="eyebrow">صدای خریداران</span><h2>خرید خوب،<br/>تجربه‌ای که می‌ماند.</h2><p>«انتخاب محصولات راحت بود و اطلاعات هر کالا کمک کرد با اطمینان بیشتری خرید کنم.»</p><div className="testimonial-author"><span className="author-avatar">م</span><span><b>مریم کاظمی</b><small>خریدار لوازم خانه</small></span><span className="testimonial-stars">★★★★★</span></div></div><div className="testimonial-visual"><Image src="/images/illustrations/customer-reviews-visual.webp" alt="" fill sizes="(max-width: 720px) 100vw, 40vw"/><span>خرید با خیال راحت</span></div></section>
    <section className="container newsletter-wide"><div><span className="eyebrow">عضو خانواده امرالد</span><h2>پیشنهادهای خوب را از دست ندهید</h2><p>از تازه‌ترین کالاها و تخفیف‌های فروشگاه باخبر شوید.</p></div><NewsletterForm wide/></section>
    <div className="container home-note"><span>کالاهای متنوع، برای انتخابی آسوده</span><Link href="/about">بیشتر درباره فروشگاه <ArrowLeft size={14}/></Link></div>
  </>;
}
