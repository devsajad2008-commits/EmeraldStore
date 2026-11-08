"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { formatPrice, products } from "@/data/products";
import { useStore } from "@/components/store-provider";
import { PageSkeleton } from "@/components/page-skeleton";
import { CustomSelect } from "@/components/custom-select";

export default function CheckoutPage() {
  const { cart, hydrated } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const lines = cart.map((line) => ({ ...line, product: products.find((item) => item.id === line.productId) })).filter((line) => line.product);
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.product!.price * line.quantity, 0), [lines]);
  const [shipping, setShipping] = useState("standard");
  const [province, setProvince] = useState("");
  const shippingPrice = shipping === "express" ? 190000 : subtotal >= 5000000 ? 0 : 120000;
  if (!hydrated) return <PageSkeleton label="در حال آماده‌سازی سفارش" layout="cart" />;
  if (submitted) return <div className="container checkout-page"><div className="checkout-result"><CheckCircle2 size={54}/><span className="eyebrow">پایان فرایند نمایشی</span><h1>اطلاعات سفارش ثبت شد</h1><p>این فروشگاه در حال حاضر به درگاه پرداخت یا سامانه ثبت سفارش متصل نیست. هیچ پرداختی انجام نشده و سفارشی در سرور ثبت نشده است.</p><Link className="button button-green" href="/">بازگشت به فروشگاه <ArrowLeft size={17}/></Link></div></div>;
  if (!lines.length) return <div className="container checkout-page"><div className="empty-state"><span className="empty-icon"><ShoppingBag/></span><h2>سبد خرید شما خالی است</h2><Link className="button button-green" href="/categories">انتخاب کالا</Link></div></div>;
  return <div className="container checkout-page"><div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><Link href="/cart">سبد خرید</Link><span>/</span><span>اطلاعات ارسال</span></div><div className="page-title-row"><div><span className="eyebrow">گام پایانی خرید</span><h1>اطلاعات ارسال و سفارش</h1></div><span className="demo-caption">پرداخت واقعی در این نسخه فعال نیست.</span></div><form className="checkout-layout" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
    <div className="checkout-form"><section className="form-panel"><h2>اطلاعات خریدار</h2><div className="form-grid"><label>نام و نام خانوادگی<input required minLength={3} placeholder="مثلاً سارا احمدی"/></label><label>شماره موبایل<input required inputMode="tel" pattern="09[0-9]{9}" placeholder="۰۹۱۲۱۲۳۴۵۶۷" title="شماره موبایل را با ۰۹ وارد کنید"/></label><label>استان<CustomSelect id="checkout-province" ariaLabel="استان" className="custom-select-form" options={["تهران", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی", "البرز", "گیلان"].map((name) => ({ label: name, value: name }))} value={province} onChange={setProvince} placeholder="انتخاب استان" required/></label><label>شهر<input required placeholder="نام شهر"/></label><label className="form-full">نشانی دقیق<input required minLength={8} placeholder="خیابان، کوچه، پلاک و واحد"/></label><label>کد پستی<input required inputMode="numeric" pattern="[0-9]{10}" placeholder="۱۰ رقم کد پستی"/></label></div></section>
    <section className="form-panel"><h2>روش ارسال</h2><label className="shipping-choice"><input type="radio" name="shipping" value="standard" checked={shipping === "standard"} onChange={() => setShipping("standard")}/><span><b>ارسال استاندارد</b><small>۲ تا ۴ روز کاری</small></span><strong>{subtotal >= 5000000 ? "رایگان" : formatPrice(120000)}</strong></label><label className="shipping-choice"><input type="radio" name="shipping" value="express" checked={shipping === "express"} onChange={() => setShipping("express")}/><span><b>ارسال سریع</b><small>۱ تا ۲ روز کاری</small></span><strong>{formatPrice(190000)}</strong></label></section><button className="button button-green full-button submit-order" type="submit">تأیید اطلاعات (نمایشی) <ArrowLeft size={17}/></button><p className="checkout-disclaimer">با ادامه، هیچ پرداخت واقعی انجام نمی‌شود. نتیجه فقط برای نمایش تجربه خرید است.</p></div>
    <aside className="cart-summary"><h2>خلاصه سفارش</h2>{lines.map(({ product, quantity, color, size }) => <div className="checkout-item" key={`${product!.id}-${color || ""}-${size || ""}`}><span>{product!.name}{color ? ` · ${color}` : ""}{size ? ` · ${size}` : ""} × {quantity.toLocaleString("fa-IR")}</span><b>{formatPrice(product!.price * quantity)}</b></div>)}<div><span>جمع کالاها</span><b>{formatPrice(subtotal)}</b></div><div><span>هزینه ارسال</span><b>{shippingPrice ? formatPrice(shippingPrice) : "رایگان"}</b></div><div className="summary-total"><span>مبلغ کل</span><b>{formatPrice(subtotal + shippingPrice)}</b></div></aside>
  </form></div>;
}
