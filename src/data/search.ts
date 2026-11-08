import type { Product } from "@/data/products";

export function normalizeSearchText(value: string) {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  return decoded
    .normalize("NFC")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .trim()
    .toLocaleLowerCase("fa");
}

export function matchesProductSearch(product: Product, query: string) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const searchableText = normalizeSearchText(
    `${product.name} ${product.brand} ${product.category} ${product.categorySlug} ${product.subcategory}`,
  );
  return searchableText.includes(normalizedQuery);
}
