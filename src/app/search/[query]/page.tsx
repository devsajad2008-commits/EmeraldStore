import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { normalizeSearchText } from "@/data/search";
import { SearchResults } from "../search-results";

export async function generateMetadata({ params }: { params: Promise<{ query: string }> }): Promise<Metadata> {
  const { query } = await params;
  const normalizedQuery = normalizeSearchText(query);
  return { title: `جست‌وجو: ${normalizedQuery}`, description: `نتایج جست‌وجوی ${normalizedQuery} در کالاها، برندها و دسته‌بندی‌های فروشگاه امرالد.` };
}

async function SearchRoute({ params }: { params: Promise<{ query: string }> }) {
  const { query } = await params;
  return <SearchResults query={normalizeSearchText(query)} />;
}

export default function SearchPage({ params }: { params: Promise<{ query: string }> }) {
  return <Suspense fallback={<PageSkeleton label="در حال جست‌وجوی کالاها" />}><SearchRoute params={params} /></Suspense>;
}
