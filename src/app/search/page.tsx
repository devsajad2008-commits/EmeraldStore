import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { PageSkeleton } from "@/components/page-skeleton";
import { SearchResults } from "./search-results";

export const metadata: Metadata = { title: "جست‌وجوی محصولات", description: "جست‌وجو در کالاها، برندها و دسته‌بندی‌های فروشگاه امرالد." };

async function SearchRoute({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  if (q) redirect(`/search/${encodeURIComponent(q)}`);
  return <SearchResults query="" />;
}

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <Suspense fallback={<PageSkeleton label="در حال جست‌وجوی کالاها" />}><SearchRoute searchParams={searchParams}/></Suspense>;
}
