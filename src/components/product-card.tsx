"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Scale, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useStore } from "@/components/store-provider";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { favorites, compare, toggleFavorite, toggleCompare, addToCart } = useStore();
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return <article className={`product-card ${compact ? "product-card-compact" : ""}`}>
    <div className="product-visual">
      <Link href={`/product/${product.slug}`} className="product-placeholder" aria-label={`مشاهده ${product.name}`}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 720px) 50vw, (max-width: 1000px) 25vw, 20vw" className="product-card-image"/>
      </Link>
      <div className="card-actions">
        <button title="افزودن به علاقه‌مندی‌ها" aria-label="افزودن به علاقه‌مندی‌ها" onClick={() => toggleFavorite(product.id)} className={favorites.includes(product.id) ? "is-favorite" : ""}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"}/></button>
        <button title="مقایسه کالا" aria-label="مقایسه کالا" onClick={() => toggleCompare(product.id)} className={compare.includes(product.id) ? "is-compared" : ""}><Scale size={17}/></button>
      </div>
      {discount > 0 && <span className="discount-badge">{discount.toLocaleString("fa-IR")}٪</span>}
      {product.isNew && <span className="new-label">جدید</span>}
    </div>
    <div className="product-info">
      <span className="product-brand">{product.brand}</span>
      <Link className="product-name" href={`/product/${product.slug}`}>{product.name}</Link>
      <div className="product-rating"><Star size={14} fill="currentColor"/><b>{product.rating.toLocaleString("fa-IR")}</b><span>({product.reviews.toLocaleString("fa-IR")})</span></div>
      <div className="product-price-row"><div>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<strong>{formatPrice(product.price)}</strong></div><button className="quick-add" onClick={() => addToCart(product.id)} title="افزودن به سبد"><ShoppingBag size={17}/></button></div>
    </div>
  </article>;
}

export function ProductGrid({ items, compact = false }: { items: Product[]; compact?: boolean }) {
  if (items.length === 0) return <div className="empty-state"><span className="empty-icon"><ShoppingBag size={28}/></span><h3>کالایی پیدا نشد</h3><p>عبارت جست‌وجو یا فیلترهای انتخابی را تغییر دهید.</p><Link className="button button-outline" href="/categories">مشاهده دسته‌بندی‌ها</Link></div>;
  return <div className={`product-grid ${compact ? "compact-grid" : ""}`}>{items.map((product) => <ProductCard key={product.id} product={product} compact={compact}/>)}</div>;
}

export function ProductSection({ title, subtitle, items, href = "/deals", tone }: { title: string; subtitle?: string; items: Product[]; href?: string; tone?: string }) {
  return <section className={`section container ${tone || ""}`}><div className="section-heading"><div><span className="eyebrow">{subtitle || "انتخاب امرالد"}</span><h2>{title}</h2></div><Link className="view-all" href={href}>مشاهده همه <ArrowLeft size={16}/></Link></div><ProductGrid items={items}/></section>;
}
