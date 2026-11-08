export type Category = {
  name: string;
  slug: string;
  imageSlug: string;
  iconSlug: string;
  description: string;
  icon: string;
  children: { name: string; slug: string; imageSlug: string }[];
};

const categoryData: [string, string, string, string, string[]][] = [
  ["کالای دیجیتال", "digital", "گجت‌ها و ابزارهای هوشمند برای زندگی امروز", "Smartphone", ["موبایل و تبلت", "گوشی موبایل", "لپ‌تاپ و کامپیوتر", "قطعات کامپیوتر", "مانیتور", "لوازم جانبی موبایل", "هدفون و هندزفری", "ساعت هوشمند", "دوربین و تجهیزات عکاسی", "کنسول و بازی", "تجهیزات شبکه", "لوازم صوتی و تصویری"]],
  ["مد و پوشاک", "fashion", "استایل روزمره، پوشاک و اکسسوری", "Shirt", ["لباس مردانه", "لباس زنانه", "لباس بچگانه", "کفش مردانه", "کفش زنانه", "کیف و کوله‌پشتی", "ساعت و اکسسوری", "لباس ورزشی", "لباس زیر و راحتی"]],
  ["خانه و آشپزخانه", "home-kitchen", "لوازم کاربردی برای خانه‌ای دلنشین", "Sofa", ["لوازم خانگی برقی", "لوازم پخت‌وپز", "ظروف آشپزخانه", "لوازم پذیرایی", "دکوراسیون منزل", "مبلمان", "روشنایی", "کالای خواب", "نظافت و شست‌وشو", "ابزار خانه"]],
  ["زیبایی و سلامت", "beauty", "مراقبت روزانه و انتخاب‌های سلامت‌محور", "Sparkles", ["مراقبت پوست", "مراقبت مو", "آرایشی", "بهداشت شخصی", "عطر و ادکلن", "تجهیزات پزشکی خانگی", "لوازم اصلاح"]],
  ["خودرو و موتورسیکلت", "automotive", "لوازم کاربردی نگهداری و سفر", "CarFront", ["لوازم جانبی خودرو", "تجهیزات ایمنی", "ابزار خودرو", "لوازم مصرفی خودرو", "لوازم موتورسیکلت", "تجهیزات نگهداری خودرو"]],
  ["کتاب، لوازم تحریر و هنر", "books-stationery", "برای مطالعه، یادداشت و آفرینش", "BookOpen", ["کتاب", "رمان و داستان", "کتاب آموزشی", "لوازم تحریر", "لوازم اداری", "ابزار هنری", "محصولات فرهنگی"]],
  ["اسباب‌بازی، کودک و نوزاد", "toys-baby", "همراه لحظه‌های رشد، بازی و یادگیری", "Baby", ["اسباب‌بازی", "بازی فکری", "عروسک", "لوازم نوزاد", "پوشاک کودک", "وسایل مراقبت کودک", "کالسکه و صندلی کودک"]],
  ["ورزش و سفر", "sports-travel", "آماده حرکت، ماجراجویی و سفر", "Backpack", ["پوشاک ورزشی", "تجهیزات ورزشی", "لوازم کمپینگ", "چمدان و ساک", "دوچرخه", "لوازم سفر", "تجهیزات کوهنوردی"]],
  ["ابزار و تجهیزات صنعتی", "tools", "ابزارهای دقیق برای خانه و کارگاه", "Wrench", ["ابزار دستی", "ابزار برقی", "تجهیزات ایمنی", "ابزار اندازه‌گیری", "تجهیزات کارگاهی", "لوازم ساختمانی"]],
  ["سوپرمارکت و مواد غذایی", "grocery", "اقلام روزمره و خوراکی‌های منتخب", "ShoppingBasket", ["مواد غذایی", "نوشیدنی", "تنقلات", "صبحانه", "محصولات پروتئینی", "مواد شوینده", "محصولات بهداشتی مصرفی", "محصولات خانه و مصرف روزانه"]],
  ["لوازم اداری و تجهیزات", "office", "ملزومات کار و فضای اداری", "Printer", ["پرینتر و اسکنر", "کاغذ و ملزومات چاپ", "تجهیزات اداری", "صندلی و میز اداری", "ماشین‌حساب", "لوازم جانبی اداری"]],
  ["محصولات بومی و محلی", "local", "دست‌ساخته‌ها و خوراکی‌های اصیل ایرانی", "Gift", ["صنایع دستی", "محصولات سنتی", "خوراکی‌های محلی", "محصولات هنری", "سوغات و هدایا"]],
];

const childImageSlugs: Record<string, string[]> = {
  digital: ["mobile-tablets", "mobile", "laptops-computers", "computer-components", "monitors", "mobile-accessories", "headphones-earphones", "smartwatches", "cameras-photography", "gaming-consoles", "network-equipment", "audio-video"],
  fashion: ["mens-clothing", "womens-clothing", "children-clothing", "mens-shoes", "womens-shoes", "bags-backpacks", "watches-accessories", "sportswear", "underwear-loungewear"],
  "home-kitchen": ["electrical-appliances", "cooking-appliances", "kitchenware", "serving-accessories", "home-decor", "furniture", "lighting", "bedding", "cleaning-laundry", "home-tools"],
  beauty: ["skincare", "haircare", "makeup", "personal-hygiene", "perfumes-colognes", "home-medical-equipment", "shaving-grooming"],
  automotive: ["car-accessories", "industrial-safety", "automotive-tools", "car-consumables", "motorcycle-accessories", "car-maintenance"],
  "books-stationery": ["books", "novels-fiction", "educational-books", "stationery", "office-equipment", "art-supplies", "cultural-products"],
  "toys-baby": ["toys", "educational-games", "dolls", "baby-products", "kids-clothing", "baby-care", "strollers-child-seats"],
  "sports-travel": ["sports-clothing", "sports-equipment", "camping-gear", "luggage-bags", "bicycles", "travel-accessories", "mountaineering-gear"],
  tools: ["hand-tools", "power-tools", "safety-equipment", "measuring-tools", "workshop-equipment", "construction-supplies"],
  grocery: ["food-products", "beverages", "snacks", "breakfast", "protein-products", "detergents", "daily-hygiene", "household-essentials"],
  office: ["printers-scanners", "paper-printing-supplies", "office-equipment-supplies", "office-desks-chairs", "calculators", "office-accessories"],
  local: ["handicrafts", "traditional-products", "local-foods", "artistic-products", "souvenirs-gifts"],
};

const categoryImageSlugs: Record<string, string> = {
  beauty: "beauty-health",
  "books-stationery": "books-stationery-art",
  tools: "tools-industrial",
  grocery: "grocery-food",
  office: "office-supplies",
  local: "local-products",
};

const categoryIconSlugs: Record<string, string> = { office: "office-equipment" };

export const categories: Category[] = categoryData.map(([name, slug, description, icon, children]) => ({
  name,
  slug,
  imageSlug: categoryImageSlugs[slug] || slug,
  iconSlug: categoryIconSlugs[slug] || categoryImageSlugs[slug] || slug,
  description,
  icon,
  children: children.map((child, index) => ({ name: child, slug: childSlug(child, slug), imageSlug: childImageSlugs[slug][index] })),
}));

export function normalizeCategorySlug(slug: string) {
  try {
    return decodeURIComponent(slug).normalize("NFC");
  } catch {
    return slug.normalize("NFC");
  }
}

function childSlug(name: string, parent: string) {
  const overrides: Record<string, string> = {
    "گوشی موبایل": "mobile",
    "لپ‌تاپ و کامپیوتر": "laptops",
    "موبایل و تبلت": "mobile-tablets",
    "هدفون و هندزفری": "headphones",
    "خانه و آشپزخانه": "home-kitchen",
    "کفش مردانه": "mens-shoes",
    "کفش زنانه": "womens-shoes",
  };
  if (overrides[name]) return overrides[name];
  return `${parent}-${name.replace(/[\s‌]+/g, "-").replace(/[،,]/g, "")}`;
}

export function getCategory(slug: string) {
  const normalizedSlug = normalizeCategorySlug(slug);
  return categories.find((category) => category.slug === normalizedSlug || category.children.some((child) => child.slug === normalizedSlug));
}
