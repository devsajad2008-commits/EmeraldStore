"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/data/products";
import { matchesProductSearch } from "@/data/search";
import { ProductGrid } from "@/components/product-card";
import { CustomSelect } from "@/components/custom-select";

export function CatalogView({ items, title, description, searchTerm = "", isSearchPage = false, image }: { items: Product[]; title: string; description: string; searchTerm?: string; isSearchPage?: boolean; image?: string }) {
  const [sort, setSort] = useState("relevance");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [inStock, setInStock] = useState(false);
  const [discounted, setDiscounted] = useState(false);
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [rating, setRating] = useState(false);
  const [limit, setLimit] = useState(12);
  const [query, setQuery] = useState(searchTerm);
  const pageTitle = isSearchPage ? (query ? `نتایج جست‌وجو: ${query}` : "جست‌وجوی کالا") : title;
  const brands = Array.from(new Set(items.map((item) => item.brand)));
  const colors = Array.from(new Set(items.flatMap((item) => item.colors || [])));
  const sizes = Array.from(new Set(items.flatMap((item) => item.sizes || [])));
  const filtered = useMemo(() => {
    let output = items.filter((product) => {
      return matchesProductSearch(product, query) && (!brand || product.brand === brand) && (!color || product.colors?.includes(color)) && (!size || product.sizes?.includes(size)) && (!inStock || product.stock > 0) && (!discounted || !!product.oldPrice) && (!rating || product.rating >= 4.5) && (!minimum || product.price >= Number(minimum)) && (!maximum || product.price <= Number(maximum));
    });
    if (sort === "price-asc") output = [...output].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") output = [...output].sort((a, b) => b.price - a.price);
    if (sort === "new") output = [...output].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === "popular") output = [...output].sort((a, b) => b.reviews - a.reviews);
    if (sort === "discount") output = [...output].sort((a, b) => (b.oldPrice ? b.oldPrice - b.price : 0) - (a.oldPrice ? a.oldPrice - a.price : 0));
    return output;
  }, [items, query, brand, color, size, inStock, discounted, rating, minimum, maximum, sort]);
  const filteredCount = filtered.length.toLocaleString("fa-IR");
  function clearFilters() { setBrand(""); setColor(""); setSize(""); setInStock(false); setDiscounted(false); setRating(false); setMinimum(""); setMaximum(""); setQuery(""); }

  return <div className="container catalog-page">
    <div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><span>{pageTitle}</span></div>
    <div className={`catalog-heading ${image ? "catalog-heading-with-image" : ""}`}><div className="catalog-heading-copy"><span className="eyebrow">{isSearchPage ? "جست‌وجوی فروشگاه" : "انتخابی برای شما"}</span><h1>{pageTitle}</h1><p>{isSearchPage && query ? `${filteredCount} کالا با عبارت «${query}» پیدا شد.` : description}</p></div>{image && <div className="catalog-feature-visual"><Image src={image} alt="" fill priority sizes="(max-width: 720px) 100vw, 320px"/></div>}<div className="catalog-search"><Search size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجو در محصولات" aria-label="جست‌وجو در محصولات"/>{query && <button type="button" onClick={() => setQuery("")} aria-label="پاک کردن"><X size={15}/></button>}</div></div>
    <div className="catalog-layout">
      <aside className="filters-panel"><div className="filter-title"><span><Filter size={17}/> فیلتر محصولات</span><button onClick={clearFilters}>پاک‌کردن</button></div>
        <label className="filter-label">محدوده قیمت <div className="price-inputs"><input inputMode="numeric" value={minimum} onChange={(event) => setMinimum(event.target.value)} placeholder="از (تومان)"/><input inputMode="numeric" value={maximum} onChange={(event) => setMaximum(event.target.value)} placeholder="تا (تومان)"/></div></label>
        <label className="filter-label">برند<CustomSelect id="catalog-brand" ariaLabel="برند" className="custom-select-filter" options={[{ label: "همه برندها", value: "" }, ...brands.map((name) => ({ label: name, value: name }))]} value={brand} onChange={setBrand}/></label>
        {colors.length > 0 && <label className="filter-label">رنگ<CustomSelect id="catalog-color" ariaLabel="رنگ" className="custom-select-filter" options={[{ label: "همه رنگ‌ها", value: "" }, ...colors.map((name) => ({ label: name, value: name }))]} value={color} onChange={setColor}/></label>}
        {sizes.length > 0 && <label className="filter-label">سایز<CustomSelect id="catalog-size" ariaLabel="سایز" className="custom-select-filter" options={[{ label: "همه سایزها", value: "" }, ...sizes.map((name) => ({ label: name, value: name }))]} value={size} onChange={setSize}/></label>}
        <div className="filter-options"><label className="filter-option"><input type="checkbox" checked={inStock} onChange={(event) => setInStock(event.target.checked)}/> فقط کالاهای موجود</label><label className="filter-option"><input type="checkbox" checked={discounted} onChange={(event) => setDiscounted(event.target.checked)}/> فقط کالاهای تخفیف‌دار</label><label className="filter-option"><input type="checkbox" checked={rating} onChange={(event) => setRating(event.target.checked)}/> امتیاز ۴.۵ به بالا</label></div>
        <div className="filter-note">فیلترهای انتخابی بلافاصله روی کالاها اعمال می‌شوند.</div>
      </aside>
      <div className="catalog-results"><div className="catalog-toolbar"><span><SlidersHorizontal size={16}/> <b>{filtered.length.toLocaleString("fa-IR")}</b> کالا</span><label>مرتب‌سازی:<CustomSelect id="catalog-sort" ariaLabel="مرتب‌سازی" className="custom-select-sort" options={[{ label: "مرتبط‌ترین", value: "relevance" }, { label: "پرفروش‌ترین", value: "popular" }, { label: "جدیدترین", value: "new" }, { label: "ارزان‌ترین", value: "price-asc" }, { label: "گران‌ترین", value: "price-desc" }, { label: "بیشترین تخفیف", value: "discount" }]} value={sort} onChange={setSort}/></label></div>
        {filtered.length > 0 && <ProductGrid items={filtered.slice(0, limit)}/>}
        {filtered.length > limit && <button className="load-more" onClick={() => setLimit((value) => value + 12)}>نمایش کالاهای بیشتر <ChevronDown size={17}/></button>}
        {!filtered.length && <div className="catalog-empty"><span className="empty-icon"><Search size={22}/></span><h2>محصولی پیدا نشد</h2><p>{isSearchPage && query ? `برای «${query}» نتیجه‌ای پیدا نکردیم. عبارت دیگری را امتحان کنید.` : "عبارت جست‌وجو یا فیلترهای انتخابی را تغییر دهید."}</p><button onClick={clearFilters} className="button button-outline">پاک‌کردن جست‌وجو و فیلترها</button></div>}
      </div>
    </div>
  </div>;
}
