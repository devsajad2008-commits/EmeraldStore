"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ChevronDown, Heart, Menu, Search, ShoppingBag, X, Clock3, Scale } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { matchesProductSearch } from "@/data/search";
import { useStore } from "@/components/store-provider";
import { StoreLogo } from "@/components/store-logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState(categories[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("emerald-search-history") || "[]") as string[]; } catch { return []; }
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const router = useRouter();
  const { cart, favorites, compare, userName } = useStore();
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);

  function submitQuery(value: string) {
    const term = value.trim();
    if (!term) return;
    const recent = [term, ...history.filter((item) => item !== term)].slice(0, 5);
    setHistory(recent);
    localStorage.setItem("emerald-search-history", JSON.stringify(recent));
    setQuery(term);
    setSearchFocused(false);
    router.push(`/search/${encodeURIComponent(term)}`);
  }

  function suggestions() {
    if (query.trim()) return products.filter((product) => matchesProductSearch(product, query)).slice(0, 5);
    return [];
  }

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuery(query);
  }

  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === "Escape") {
      setOpen(false);
      setMobileOpen(false);
    }
  }}>
    <div className="topline"><div className="container topline-inner"><span>تجربه خریدی مطمئن، برای انتخاب‌های هر روز</span><div><Link href="/shipping">راهنمای ارسال</Link><span className="top-dot">•</span><Link href="/faq">پشتیبانی و سوالات</Link></div></div></div>
    <div className="container header-main">
      <button type="button" className="icon-btn mobile-menu-trigger" aria-label={mobileOpen ? "بستن دسته‌بندی‌ها" : "باز کردن دسته‌بندی‌ها"} aria-expanded={mobileOpen} aria-controls="mobile-category-menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      <StoreLogo/>
      <form className="search-box" onSubmit={search} onFocus={() => setSearchFocused(true)} onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی کالا، برند یا دسته‌بندی..." aria-label="جست‌وجوی محصولات" /><button type="submit">جست‌وجو</button>
        {searchFocused && (query.trim() ? suggestions().length > 0 : history.length > 0) && <div className="search-suggestions">{query.trim() ? suggestions().map((product) => <button type="button" key={product.id} onMouseDown={(event) => event.preventDefault()} onClick={() => submitQuery(product.name)}><Search size={14}/><span>{product.name}</span><small>{product.brand}</small></button>) : <><div className="suggestion-label"><Clock3 size={13}/> جست‌وجوهای اخیر</div>{history.map((item) => <button type="button" key={item} onMouseDown={(event) => event.preventDefault()} onClick={() => submitQuery(item)}><Clock3 size={13}/><span>{item}</span></button>)}</>}</div>}
      </form>
      <div className="header-actions">
        <Link className="account-link" href={userName ? "/profile" : "/login"}><span className="account-avatar">{userName ? userName.slice(0, 1) : "ورود"}</span><span>{userName || "ورود"}</span></Link>
        <Link className="header-action" href="/favorites" aria-label="علاقه‌مندی‌ها"><span className="action-icon"><Heart size={20} /><i className="count-badge">{favorites.length}</i></span><span>علاقه‌مندی</span></Link>
        <Link className="header-action" href="/compare" aria-label="مقایسه کالاها"><span className="action-icon"><Scale size={20}/><i className="count-badge">{compare.length}</i></span><span>مقایسه</span></Link>
        <Link className="header-action cart-action" href="/cart" aria-label="سبد خرید"><span className="action-icon"><ShoppingBag size={21} /><i className="count-badge">{count}</i></span><span>سبد خرید</span></Link>
      </div>
    </div>
    <div className="nav-wrap">
      <nav className="container category-nav" aria-label="دسته‌بندی محصولات" onMouseLeave={() => setOpen(false)}>
        <button type="button" className={`all-categories ${open ? "active" : ""}`} aria-expanded={open} aria-controls="category-mega-menu" onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)} onFocus={() => setOpen(true)}><Menu size={17} />دسته‌بندی کالاها<ChevronDown className={open ? "rotated" : ""} size={15} /></button>
        <div className="nav-links"><Link href="/category/digital" onClick={() => setOpen(false)}>کالای دیجیتال</Link><Link href="/category/home-kitchen" onClick={() => setOpen(false)}>خانه و آشپزخانه</Link><Link href="/category/fashion" onClick={() => setOpen(false)}>مد و پوشاک</Link><Link href="/category/beauty" onClick={() => setOpen(false)}>زیبایی و سلامت</Link><Link href="/deals" onClick={() => setOpen(false)}>تخفیف‌های امروز</Link></div>
        <Link className="seller-link" href="/category/local" onClick={() => setOpen(false)}>محصولات بومی <ArrowDown size={14} /></Link>
        {open && <div className="mega-menu" id="category-mega-menu">
          <aside className="mega-cats" aria-label="دسته‌بندی‌ها">{categories.map((category) => <Link className={activeCategorySlug === category.slug ? "selected" : ""} key={category.slug} href={`/category/${category.slug}`} onMouseEnter={() => setActiveCategorySlug(category.slug)} onFocus={() => setActiveCategorySlug(category.slug)} onClick={() => setOpen(false)}><span>{category.name}</span><ChevronDown size={14} /></Link>)}</aside>
          <div className="mega-content">
            {categories.filter((category) => category.slug === activeCategorySlug).map((category) => <div key={category.slug} className="mega-category-panel">
              <div className="mega-heading"><span>زیرشاخه‌های {category.name}</span><Link href={`/category/${category.slug}`} onClick={() => setOpen(false)}>مشاهده همه محصولات ←</Link></div>
              <div className="mega-grid">{category.children.map((child) => <Link key={child.slug} href={`/category/${child.slug}`} onClick={() => setOpen(false)}>{child.name}<ChevronDown size={13}/></Link>)}</div>
            </div>)}
          </div>
        </div>}
      </nav>
    </div>
    {mobileOpen && <>
      <button type="button" className="mobile-drawer-backdrop" aria-label="بستن منوی دسته‌بندی" onClick={() => setMobileOpen(false)} />
      <nav className="mobile-drawer" id="mobile-category-menu" aria-label="منوی دسته‌بندی">
        <div className="mobile-drawer-head"><span>دسته‌بندی کالاها</span><button type="button" onClick={() => setMobileOpen(false)} aria-label="بستن"><X /></button></div>
        <form className="search-box mobile-search" onSubmit={search}><Search size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی کالا..." aria-label="جست‌وجو"/><button>برو</button></form>
        <div className="mobile-drawer-links">{categories.map((category) => <details className="mobile-category-group" key={category.slug}>
          <summary><Link href={`/category/${category.slug}`} onClick={() => setMobileOpen(false)}>{category.name}</Link><ChevronDown size={15}/></summary>
          <div className="mobile-subcategories">{category.children.map((child) => <Link href={`/category/${child.slug}`} key={child.slug} onClick={() => setMobileOpen(false)}>{child.name}</Link>)}</div>
        </details>)}</div>
        <Link href="/cart" className="mobile-cart" onClick={() => setMobileOpen(false)}><ShoppingBag size={18}/>مشاهده سبد خرید ({count})</Link>
        <Link href="/compare" className="mobile-cart" onClick={() => setMobileOpen(false)}><Scale size={18}/>مقایسه کالاها ({compare.length})</Link>
      </nav>
    </>}
  </header>;
}
