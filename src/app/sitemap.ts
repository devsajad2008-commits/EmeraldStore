import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { siteBaseUrl } from "@/data/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/categories", "/deals", "/bestsellers", "/new-arrivals", "/about", "/contact", "/faq", "/shipping", "/returns", "/terms", "/privacy"].map((path) => ({ url: `${siteBaseUrl}${path}`, lastModified: new Date() }));
  const categoryPages = categories.flatMap((category) => [{ url: `${siteBaseUrl}/category/${category.slug}`, lastModified: new Date() }, ...category.children.map((child) => ({ url: `${siteBaseUrl}/category/${child.slug}`, lastModified: new Date() }))]);
  return [...staticPages, ...categoryPages, ...products.map((product) => ({ url: `${siteBaseUrl}/product/${product.slug}`, lastModified: new Date() }))];
}
