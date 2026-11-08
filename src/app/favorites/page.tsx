"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { products } from "@/data/products";
import { useStore } from "@/components/store-provider";
import { PageSkeleton } from "@/components/page-skeleton";

export default function FavoritesPage() {
  const { favorites, hydrated } = useStore();
  const saved = products.filter((product) => favorites.includes(product.id));
  if (!hydrated) return <PageSkeleton label="در حال بارگذاری علاقه‌مندی‌ها" />;
  return <div className="container catalog-page"><div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><span>علاقه‌مندی‌ها</span></div><div className="catalog-heading"><div><span className="eyebrow">ذخیره برای بعد</span><h1>علاقه‌مندی‌های من</h1><p>کالاهایی که برای خرید بعدی نگه داشته‌اید.</p></div><span className="saved-count"><Heart size={16}/> {saved.length.toLocaleString("fa-IR")} کالا</span></div>{saved.length ? <ProductGrid items={saved}/> : <div className="empty-state"><span className="empty-icon"><ShoppingBag size={28}/></span><h2>هنوز کالایی ذخیره نکرده‌اید</h2><p>روی قلب هر کالا بزنید تا آن را به فهرست علاقه‌مندی‌ها اضافه کنید.</p><Link className="button button-green" href="/categories">کشف محصولات</Link></div>}</div>;
}
