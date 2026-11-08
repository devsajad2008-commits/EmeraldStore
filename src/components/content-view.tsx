"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, CircleHelp, Mail, MapPin, Phone } from "lucide-react";
import { storeName } from "@/data/store";
import { useStore } from "@/components/store-provider";

const pages: Record<string, { title: string; intro: string; sections: [string, string][] }> = {
  about: { title: `درباره ${storeName}`, intro: "امرالد استور یک فروشگاه اینترنتی چنددسته‌بندی برای خرید ساده‌تر کالاهای روزمره است.", sections: [["انتخاب متنوع", "در دسته‌بندی‌های گوناگون از کالای دیجیتال تا لوازم خانه، پوشاک، کتاب و محصولات بومی، کالاهای منتخب را کنار هم قرار داده‌ایم."], ["اطلاعات روشن", "توضیحات، قیمت نمایشی، موجودی و مشخصات هر محصول به شکلی مرتب ارائه می‌شود تا مقایسه و انتخاب آسان‌تر باشد."], ["خریدی مطمئن", "تجربه خرید با تأکید بر شفافیت، پاسخ‌گویی به مشتریان و اطلاع‌رسانی روشن درباره ارسال و شرایط بازگشت طراحی شده است."]] },
  shipping: { title: "روش‌ها و شرایط ارسال", intro: "جزئیات ارسال سفارش‌ها در این صفحه برای آشنایی با تجربه خرید فروشگاه ارائه شده است.", sections: [["ارسال استاندارد", "زمان تقریبی ارسال استاندارد ۲ تا ۴ روز کاری است. سفارش‌ها با بسته‌بندی مناسب و امکان پیگیری آماده می‌شوند."], ["ارسال سریع", "در برخی مناطق، گزینه ارسال سریع با زمان تقریبی ۱ تا ۲ روز کاری در دسترس است."], ["هزینه ارسال", "هزینه ارسال در مرحله خلاصه سفارش نمایش داده می‌شود. در این نسخه، قیمت‌ها و محاسبات صرفاً نمایشی هستند و سفارش واقعی ثبت نمی‌شود."]] },
  returns: { title: "شرایط بازگشت کالا", intro: "رضایت شما از خرید برای ما اهمیت دارد. شرایط زیر راهنمای کلی بازگشت کالا در تجربه فروشگاه است.", sections: [["مهلت بررسی", "برای کالاهای مشمول، امکان اعلام درخواست بازگشت تا ۷ روز پس از دریافت در نظر گرفته شده است."], ["وضعیت کالا", "کالا باید در وضعیت اولیه و همراه با متعلقات و بسته‌بندی اصلی بازگردانده شود؛ برخی کالاهای مصرفی و بهداشتی محدودیت دارند."], ["ثبت درخواست", "برای پیگیری درخواست بازگشت، با پشتیبانی مشتریان تماس بگیرید و شماره سفارش و دلیل درخواست را اعلام کنید."]] },
  terms: { title: "قوانین و مقررات", intro: "استفاده از فروشگاه به معنی مطالعه و پذیرش شرایط خرید، ارسال و خدمات مشتریان است.", sections: [["اطلاعات کالا", "اطلاعات کالاها، تصاویر جایگزین و موجودی در این نسخه نمایشی هستند و ممکن است بازتاب‌دهنده فروش واقعی نباشند."], ["قیمت و سفارش", "تمامی قیمت‌ها برای نمایش تجربه خرید درج شده‌اند. در این نسخه درگاه پرداخت و ثبت سفارش سروری وجود ندارد."], ["استفاده از سایت", "کاربران متعهد می‌شوند از امکانات فروشگاه در چارچوب قوانین و با اطلاعات صحیح استفاده کنند."]] },
  privacy: { title: "حریم خصوصی", intro: "حفظ حریم خصوصی کاربران و شفافیت در نگهداری اطلاعات، بخشی از تجربه خرید قابل اعتماد است.", sections: [["اطلاعات مرورگر", "سبد خرید، علاقه‌مندی‌ها و مقایسه در این نسخه فقط در حافظه محلی مرورگر شما ذخیره می‌شوند."], ["فرم‌های نمایشی", "فرم‌های حساب کاربری و سفارش در نسخه فعلی به سامانه یا سروری ارسال نمی‌شوند."], ["خبرنامه", "فرم خبرنامه صرفاً نمایشی است؛ در این نسخه ایمیلی ذخیره یا برای شخص دیگری ارسال نمی‌شود."]] },
  contact: { title: "تماس با ما", intro: "برای پرسش درباره کالاها، ارسال یا تجربه خرید، از راه‌های زیر با پشتیبانی مشتریان در ارتباط باشید.", sections: [["پشتیبانی تلفنی", "شنبه تا چهارشنبه، ساعت ۹ تا ۱۷ | ۰۲۱-۸۸۸۸۰۰۰۰"], ["ایمیل", "support@emerald-store.example"], ["نشانی", "تهران، خیابان بهار، فروشگاه امرالد"]] },
  "404": { title: "صفحه پیدا نشد", intro: "صفحه‌ای که به دنبال آن هستید در فروشگاه موجود نیست یا نشانی آن تغییر کرده است.", sections: [["راه بازگشت", "می‌توانید از جست‌وجو، دسته‌بندی‌ها یا صفحه اصلی برای یافتن محصولات موردنظرتان استفاده کنید."]] },
};

const faq = [
  ["چطور کالای موردنظرم را پیدا کنم؟", "از جست‌وجوی بالای صفحه برای نام کالا یا برند استفاده کنید، یا وارد دسته‌بندی موردنظر شوید و فیلترها را به کار ببرید."],
  ["آیا امکان مقایسه محصولات وجود دارد؟", "بله؛ گزینه مقایسه را روی کارت کالاها انتخاب کنید. حداکثر چهار محصول برای مشاهده کنار هم قابل انتخاب است."],
  ["سبد خرید و علاقه‌مندی‌ها پس از بستن مرورگر باقی می‌مانند؟", "بله، این موارد در مرورگر همین دستگاه ذخیره می‌شوند و با پاک‌کردن داده‌های سایت از بین می‌روند."],
  ["آیا در این نسخه پرداخت واقعی انجام می‌شود؟", "خیر؛ این فروشگاه یک نمونه نمایشی سمت کاربر است و پرداخت یا ثبت سفارش واقعی ندارد."],
  ["هزینه و زمان ارسال چقدر است؟", "ارسال استاندارد حدود ۲ تا ۴ روز کاری زمان می‌برد. هزینه نهایی در خلاصه خرید نمایش داده می‌شود."],
  ["چطور کالا را مرجوع کنم؟", "شرایط کلی در صفحه بازگشت کالا توضیح داده شده است. برای راهنمایی بیشتر با پشتیبانی مشتریان تماس بگیرید."],
];

export function ContentView({ slug }: { slug: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();
  const { login } = useStore();
  if (slug === "faq") return <div className="container content-page"><div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><span>پرسش‌های متداول</span></div><div className="content-heading"><span className="eyebrow">پاسخ همراه شماست</span><h1>پرسش‌های متداول خرید</h1><p>پاسخ پرسش‌های پرتکرار درباره انتخاب کالا، ارسال و تجربه خرید.</p></div><div className="faq-list">{faq.map(([question, answer]) => <details className="faq-item" key={question}><summary><span><CircleHelp size={18}/>{question}</span><ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div></div>;
  if (slug === "login") return <div className="container auth-page"><div className="auth-card"><span className="auth-mark">ES</span><span className="eyebrow">حساب کاربری امرالد</span><h1>ورود به حساب کاربری</h1><p>نام خود را وارد کنید تا وارد شوید.</p><form onSubmit={(event) => { event.preventDefault(); const trimmedName = name.trim(); if (!trimmedName) return; login(trimmedName); router.push("/"); }}><label>نام شما<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="مثلاً سارا احمدی"/></label><button className="button button-green full-button">ورود <ArrowLeft size={17}/></button></form></div></div>;
  const page = pages[slug];
  if (!page) return null;
  return <div className="container content-page"><div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><span>{page.title}</span></div><div className="content-heading"><span className="eyebrow">EMERALD STORE</span><h1>{page.title}</h1><p>{page.intro}</p></div>
    {slug === "contact" && <div className="contact-cards"><div><Phone/><b>تلفن پشتیبانی</b><span>۰۲۱-۸۸۸۸۰۰۰۰</span></div><div><Mail/><b>ایمیل</b><span>support@emerald-store.example</span></div><div><MapPin/><b>نشانی</b><span>تهران، خیابان بهار</span></div></div>}
    <div className="content-sections">{page.sections.map(([title, text], index) => <section key={title}><span className="content-number">۰{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div></section>)}</div>
    {slug === "contact" && <div className="contact-form-panel"><h2>ارسال پیام</h2>{submitted ? <p className="form-success">پیام شما به‌صورت نمایشی ثبت شد. در این نسخه اطلاعاتی به سرور ارسال نمی‌شود.</p> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="form-grid"><label>نام شما<input required placeholder="نام و نام خانوادگی"/></label><label>شماره تماس<input required inputMode="tel" pattern="09[0-9]{9}" placeholder="۰۹۱۲۱۲۳۴۵۶۷"/></label><label className="form-full">پیام شما<textarea required minLength={10} rows={4} placeholder="موضوع پیام خود را بنویسید"/></label><button className="button button-green">ارسال پیام نمایشی</button></form>}</div>}
    {slug === "404" && <Link className="button button-green" href="/">بازگشت به صفحه اصلی</Link>}
    <div className="content-help">برای انتخاب و خرید کالا به <Link href="/categories">دسته‌بندی محصولات</Link> سر بزنید یا <Link href="/contact">با پشتیبانی تماس بگیرید</Link>.</div>
  </div>;
}
