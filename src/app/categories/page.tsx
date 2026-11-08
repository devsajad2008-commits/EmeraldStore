import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CategoryGrid } from "@/components/category-card";
import { categories } from "@/data/categories";

export const metadata: Metadata = { title: "دسته‌بندی محصولات", description: "همه دسته‌بندی‌های خرید از فروشگاه EMERALD STORE.", openGraph: { images: ["/images/og/pages/categories.webp"] } };

export default function CategoriesPage() {
  return <div className="container content-page"><div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><span>دسته‌بندی‌ها</span></div><div className="category-overview"><div className="content-heading"><span className="eyebrow">کشف و انتخاب</span><h1>دسته‌بندی‌های فروشگاه</h1><p>از کالای دیجیتال تا لوازم خانه و خوراکی‌های روزمره؛ همه انتخاب‌ها را یک‌جا ببینید.</p></div><div className="category-overview-visual"><Image src="/images/banners/home-slider-daily-shopping.webp" alt="" fill preload sizes="(max-width: 720px) 100vw, 360px"/></div></div><CategoryGrid items={categories}/></div>;
}
