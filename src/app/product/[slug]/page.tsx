import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { findProduct, products } from "@/data/products";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  return product ? { title: product.name, description: product.shortDescription, openGraph: { title: product.name, description: product.shortDescription, images: [`/images/og/products/${product.slug}.webp`] } } : { title: "محصول پیدا نشد" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  return <ProductDetail key={product.id} product={product}/>;
}
