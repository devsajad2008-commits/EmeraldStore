"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, Heart, Minus, Plus, Scale, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice, products } from "@/data/products";
import { ProductGrid } from "@/components/product-card";
import { useStore } from "@/components/store-provider";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite, compare, toggleCompare, notify } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState(0);
  const [tabDirection, setTabDirection] = useState<"forward" | "backward">("forward");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [color, setColor] = useState(product.colors?.[0] || "");
  const [size, setSize] = useState(product.sizes?.[0] || "");
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const related = products.filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id).slice(0, 4);
  const tabLabels = ["درباره این کالا", "مشخصات فنی", "دیدگاه خریداران", "پرسش و پاسخ"];
  const selectTab = (index: number) => {
    if (index === activeTab) return;
    setTabDirection(index > activeTab ? "forward" : "backward");
    setActiveTab(index);
  };

  useEffect(() => {
    if (window.location.hash !== "#reviews") return;
    if (activeTab !== 2) {
      const timeoutId = window.setTimeout(() => {
        setTabDirection(activeTab < 2 ? "forward" : "backward");
        setActiveTab(2);
      });
      return () => window.clearTimeout(timeoutId);
    }
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowLeft") nextIndex = (activeTab + 1) % tabLabels.length;
    if (event.key === "ArrowRight") nextIndex = (activeTab + tabLabels.length - 1) % tabLabels.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabLabels.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return <div className="container product-detail-page">
    <div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><Link href={`/category/${product.categorySlug}`}>{product.categorySlug}</Link><span>/</span><span>{product.name}</span></div>
    <div className="product-detail">
      <div className="detail-gallery"><div className="detail-main-image"><Image src={activeImage} alt={product.name} fill preload sizes="(max-width: 720px) 100vw, 45vw" className="detail-product-image"/></div><div className="detail-thumbnails" aria-label="تصاویر محصول">{[product.image, ...product.galleryImages].map((image, index) => <button key={image} className={`thumb ${activeImage === image ? "thumb-active" : ""}`} aria-label={`نمای تصویر ${index + 1}`} aria-pressed={activeImage === image} onClick={() => setActiveImage(image)}><Image src={image} alt="" fill sizes="62px" className="detail-thumbnail-image"/></button>)}</div></div>
      <div className="detail-copy"><span className="detail-category">{product.subcategory} <span>•</span> {product.brand}</span><h1>{product.name}</h1><p className="detail-short">{product.shortDescription}</p><div className="detail-rating"><span><Star size={16} fill="currentColor"/>{product.rating.toLocaleString("fa-IR")}</span><a href="#reviews" onClick={() => selectTab(2)}>{product.reviews.toLocaleString("fa-IR")} دیدگاه خریداران</a><span>شناسه: {product.id}</span></div>
        <div className="detail-buy-panel"><div className="detail-stock">{product.stock > 0 ? <><Check size={16}/> موجود در فروشگاه</> : <span className="error-text">ناموجود</span>}</div>
          {product.colors && <div className="variant-row"><b>رنگ:</b>{product.colors.map((item) => <button key={item} className={color === item ? "variant-selected" : ""} onClick={() => setColor(item)}>{item}</button>)}</div>}
          {product.sizes && <div className="variant-row"><b>سایز:</b>{product.sizes.map((item) => <button key={item} className={size === item ? "variant-selected" : ""} onClick={() => setSize(item)}>{item}</button>)}</div>}
          <div className="detail-price">{discount > 0 && <span className="discount-badge">{discount.toLocaleString("fa-IR")}٪ تخفیف</span>}{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<strong>{formatPrice(product.price)}</strong></div>
          <div className="detail-actions"><div className="quantity-picker"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="کم کردن"><Minus size={15}/></button><span>{quantity.toLocaleString("fa-IR")}</span><button onClick={() => setQuantity(Math.min(product.stock || 1, quantity + 1))} aria-label="زیاد کردن"><Plus size={15}/></button></div><button className="button button-green add-to-cart" disabled={!product.stock} onClick={() => addToCart(product.id, quantity, color || undefined, size || undefined)}><ShoppingBag size={18}/> افزودن به سبد خرید</button></div>
          <div className="detail-secondary-actions"><button onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"}/>{favorites.includes(product.id) ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}</button><button onClick={() => toggleCompare(product.id)}><Scale size={17}/>{compare.includes(product.id) ? "حذف از مقایسه" : "افزودن به مقایسه"}</button></div>
        </div>
        <div className="seller-points"><span><ShieldCheck size={18}/> ضمانت اصالت و سلامت کالا</span><span><Truck size={18}/> ارسال از فروشگاه، ۲ تا ۴ روز کاری</span><span><Check size={18}/> امکان مرجوعی طبق شرایط فروشگاه</span></div>
      </div>
    </div>
    <div className="product-tabs">
      <div className="product-tab-list" role="tablist" aria-label="اطلاعات محصول" aria-orientation="horizontal">
        {tabLabels.map((label, index) => <button key={label} ref={(element) => { tabRefs.current[index] = element; }} className={`product-tab${activeTab === index ? " product-tab-active" : ""}`} id={`product-tab-${index}`} type="button" role="tab" aria-selected={activeTab === index} aria-controls="product-tab-panel" tabIndex={activeTab === index ? 0 : -1} onClick={() => selectTab(index)} onKeyDown={handleTabKeyDown}>{label}</button>)}
      </div>
      <div key={activeTab} id="product-tab-panel" className={`product-tabs-panel product-tabs-panel-${tabDirection}`} role="tabpanel" aria-labelledby={`product-tab-${activeTab}`} tabIndex={0}>
        {activeTab === 0 && <section><h2>درباره این کالا</h2><p>{product.description}</p><ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>}
        {activeTab === 1 && <section><h2>مشخصات فنی</h2><div className="spec-table">{Object.entries(product.specs).map(([key, value]) => <div key={key}><span>{key}</span><b>{value}</b></div>)}</div></section>}
        {activeTab === 2 && <section id="reviews"><h2>دیدگاه خریداران <span className="review-total">{product.reviews.toLocaleString("fa-IR")} دیدگاه</span></h2><div className="review-card"><div className="review-card-head"><b>خریدار امرالد</b><span><Star size={14} fill="currentColor"/> {product.rating.toLocaleString("fa-IR")}</span></div><p>کیفیت کالا با توضیحات مطابقت داشت و بسته‌بندی سالم به دستم رسید. از خریدم راضی هستم.</p><small>خریداری‌شده از EMERALD STORE</small></div><button className="review-write" onClick={() => notify("ثبت دیدگاه پس از ورود به حساب کاربری امکان‌پذیر است")}>ثبت دیدگاه</button></section>}
        {activeTab === 3 && <section><h2>پرسش و پاسخ</h2><details className="faq-item"><summary>آیا این کالا با ضمانت عرضه می‌شود؟<ChevronLeft size={17}/></summary><p>بله، سلامت و اصالت کالا هنگام ارسال بررسی می‌شود. شرایط ضمانت در اطلاعات محصول درج شده است.</p></details><details className="faq-item"><summary>چه زمانی کالا به دستم می‌رسد؟<ChevronLeft size={17}/></summary><p>زمان تقریبی ارسال برای بیشتر شهرها ۲ تا ۴ روز کاری است و هنگام ادامه خرید نمایش داده می‌شود.</p></details></section>}
      </div>
    </div>
    {related.length > 0 && <section className="section"><div className="section-heading"><div><span className="eyebrow">انتخاب‌های نزدیک</span><h2>محصولات مشابه</h2></div><Link href={`/category/${product.categorySlug}`} className="view-all">مشاهده دسته <ChevronLeft size={16}/></Link></div><ProductGrid items={related}/></section>}
  </div>;
}
