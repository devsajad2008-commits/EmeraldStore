import { CatalogView } from "@/components/catalog-view";
import { products } from "@/data/products";
import { normalizeSearchText } from "@/data/search";

export function SearchResults({ query }: { query: string }) {
  const normalizedQuery = normalizeSearchText(query);
  return <CatalogView
    items={products}
    title="نتایج جست‌وجو"
    description="نام کالا، برند یا دسته‌بندی موردنظرتان را جست‌وجو کنید."
    searchTerm={normalizedQuery}
    isSearchPage
  />;
}
