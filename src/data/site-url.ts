const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emerald-store.example";

export const siteUrl = new URL(configuredSiteUrl);
export const siteBaseUrl = siteUrl.origin;
