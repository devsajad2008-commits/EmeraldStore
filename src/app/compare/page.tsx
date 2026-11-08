"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Scale, X } from "lucide-react";
import { products, formatPrice, type Product } from "@/data/products";
import { useStore } from "@/components/store-provider";
import { PageSkeleton } from "@/components/page-skeleton";

export default function ComparePage() {
  const { compare, toggleCompare, hydrated } = useStore();
  const router = useRouter();
  const items = products.filter((item) => compare.includes(item.id));
  const rows: { label: string; value: (product: Product) => string }[] = [
    { label: "برند", value: (product) => product.brand },
    { label: "دسته‌بندی", value: (product) => product.subcategory },
    { label: "امتیاز کاربران", value: (product) => `${product.rating.toLocaleString("fa-IR")} از ۵` },
    { label: "دیدگاه‌ها", value: (product) => product.reviews.toLocaleString("fa-IR") },
    { label: "موجودی", value: (product) => product.stock ? "موجود" : "ناموجود" },
    { label: "ویژگی‌ها", value: (product) => product.features.join("، ") },
    ...Array.from(new Set(items.flatMap((product) => Object.keys(product.specs)))).map((key) => ({
      label: key,
      value: (product: Product) => product.specs[key] || "—",
    })),
  ];

  if (!hydrated) return <PageSkeleton label="در حال بارگذاری مقایسه کالاها" />;
  return <div className="container compare-page">
    <div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><span>مقایسه کالاها</span></div>
    <div className="catalog-heading"><div><span className="eyebrow">انتخاب آگاهانه</span><h1>مقایسه محصولات</h1><p>مشخصات و قیمت کالاهای انتخاب‌شده را کنار هم بررسی کنید.</p></div><span className="saved-count"><Scale size={17}/> {items.length.toLocaleString("fa-IR")} از ۴ کالا</span></div>
    {!items.length ? <div className="empty-state"><span className="empty-icon"><Scale size={29}/></span><h2>کالایی برای مقایسه انتخاب نشده</h2><p>در کارت محصول، گزینه مقایسه را انتخاب کنید تا کالاها اینجا نمایش داده شوند.</p><Link className="button button-green" href="/categories">مشاهده کالاها</Link></div> :
      <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>مشخصات</th>{items.map((product) => <th key={product.id}>
        <button className="remove-compare" onClick={() => toggleCompare(product.id)} aria-label="حذف از مقایسه"><X size={15}/> حذف</button>
        <Link href={`/product/${product.slug}`} className="compare-product-img"><Image src={product.image} alt={product.name} fill sizes="90px"/></Link>
        <Link href={`/product/${product.slug}`} className="compare-product-name">{product.name}</Link>
        <strong className="compare-price">{formatPrice(product.price)}</strong>
        <button className="button button-outline compare-buy" onClick={() => router.push(`/product/${product.slug}`)}>مشاهده کالا</button>
      </th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><th>{row.label}</th>{items.map((product) => <td key={product.id}>{row.value(product)}</td>)}</tr>)}</tbody></table></div>}
  </div>;
}
