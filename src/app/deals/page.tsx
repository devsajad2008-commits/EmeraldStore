import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog-view";
import { discountedProducts } from "@/data/products";

export const metadata: Metadata = { title: "تخفیف‌های امروز", description: "محصولات تخفیف‌دار و پیشنهادهای منتخب امروز.", openGraph: { images: ["/images/og/pages/deals.webp"] } };
export default function DealsPage() { return <CatalogView items={discountedProducts} title="تخفیف‌های جذاب امروز" description="پیشنهادهای ویژه در دسته‌بندی‌های متنوع؛ قیمت‌ها و موجودی به‌صورت نمایشی هستند."/>; }
