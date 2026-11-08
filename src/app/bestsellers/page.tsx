import { CatalogView } from "@/components/catalog-view";
import { products } from "@/data/products";
export const metadata = { title: "پرفروش‌ترین کالاها", description: "محصولات پرفروش و محبوب خریداران در فروشگاه.", openGraph: { images: ["/images/og/pages/bestsellers.webp"] } };
export default function Page() { return <CatalogView items={products.filter((item) => item.isBestSeller)} title="پرفروش‌ترین کالاهای این هفته" description="محبوب‌ترین انتخاب‌ها از دسته‌بندی‌های گوناگون."/>; }
