import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/catalog-view";
import { categories, getCategory, normalizeCategorySlug } from "@/data/categories";
import { products } from "@/data/products";

export function generateStaticParams() {
  return categories.flatMap((category) => [{ slug: category.slug }, ...category.children.map((child) => ({ slug: child.slug }))]);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = normalizeCategorySlug((await params).slug);
  const category = getCategory(slug);
  const child = category?.children.find((item) => item.slug === slug);
  const imageSlug = child?.imageSlug || category?.imageSlug;
  return {
    title: child?.name || category?.name || "دسته‌بندی محصولات",
    description: category?.description,
    openGraph: imageSlug ? { images: [`/images/og/categories/${imageSlug}.webp`] } : undefined,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = normalizeCategorySlug((await params).slug);
  const category = getCategory(slug);
  if (!category) notFound();
  const child = category.children.find((item) => item.slug === slug);
  const items = products.filter((product) => product.categorySlug === category.slug && (!child || product.subcategory === child.name));
  const imageSlug = child?.imageSlug || category.imageSlug;
  return <CatalogView items={items} title={child?.name || category.name} description={child ? `${child.name} از مجموعه ${category.name}؛ انتخابی مطمئن از محصولات فروشگاه.` : category.description} image={`/images/categories/${imageSlug}.webp`}/>;
}
