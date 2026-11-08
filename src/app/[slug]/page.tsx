import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentView } from "@/components/content-view";

const pages = ["about", "contact", "faq", "shipping", "returns", "terms", "privacy", "login", "404"];
const titles: Record<string, string> = { about: "درباره فروشگاه", contact: "تماس با ما", faq: "پرسش‌های متداول", shipping: "روش‌های ارسال", returns: "شرایط بازگشت کالا", terms: "قوانین و مقررات", privacy: "حریم خصوصی", login: "ورود", "404": "صفحه پیدا نشد" };
const pageOgImages: Record<string, string> = { about: "about", contact: "contact", faq: "faq", shipping: "shipping", returns: "returns", terms: "terms", privacy: "privacy" };

export function generateStaticParams() { return pages.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const image = pageOgImages[slug]; return { title: titles[slug] || "فروشگاه اینترنتی امرالد", openGraph: image ? { images: [`/images/og/pages/${image}.webp`] } : undefined }; }
export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!pages.includes(slug)) notFound(); return <ContentView slug={slug}/>; }
