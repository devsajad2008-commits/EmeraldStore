import { CatalogView } from "@/components/catalog-view";
import { products } from "@/data/products";
export const metadata = { title: "تازه‌های فروشگاه", description: "جدیدترین محصولات اضافه‌شده به فروشگاه امرالد.", openGraph: { images: ["/images/og/pages/new-arrivals.webp"] } };
export default function Page() { return <CatalogView items={products.filter((item) => item.isNew)} title="جدیدترین محصولات فروشگاه" description="تازه رسیده‌اند؛ جدیدترین کالاهای منتخب در دسته‌بندی‌های مختلف."/>; }
