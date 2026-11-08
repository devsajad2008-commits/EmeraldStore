const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emerald-store-opal.vercel.app";

export const siteUrl = new URL(configuredSiteUrl);
export const siteBaseUrl = siteUrl.origin;
