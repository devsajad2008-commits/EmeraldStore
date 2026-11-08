import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Category } from "@/data/categories";

export function CategoryCard({ category, index }: { category: Category; index: number }) {
  return <Link href={`/category/${category.slug}`} className={`category-card category-tone-${index % 6}`}>
    <span className="category-icon"><Image src={`/images/icons/categories/${category.iconSlug}.svg`} alt="" width={24} height={24}/></span>
    <span className="category-text"><b>{category.name}</b><small>{category.children.slice(0, 3).map((child) => child.name).join("، ")}</small></span>
    <ArrowLeft size={16} className="category-arrow"/>
  </Link>;
}

export function CategoryGrid({ items }: { items: Category[] }) {
  return <div className="category-grid">{items.map((category, index) => <CategoryCard key={category.slug} category={category} index={index}/>)}</div>;
}
