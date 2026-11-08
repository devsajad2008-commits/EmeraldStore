"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useStore } from "@/components/store-provider";
import { PageSkeleton } from "@/components/page-skeleton";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, hydrated } = useStore();
  const lines = cart.map((line) => ({ ...line, product: products.find((item) => item.id === line.productId) })).filter((line) => line.product);
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.product!.price * line.quantity, 0), [lines]);
  const shipping = subtotal === 0 || subtotal >= 5000000 ? 0 : 120000;
  if (!hydrated) return <PageSkeleton label="در حال بارگذاری سبد خرید" layout="cart" />;
  return <div className="container cart-page"><div className="breadcrumbs"><Link href="/">خانه</Link><span>/</span><span>سبد خرید</span></div><div className="page-title-row"><div><span className="eyebrow">انتخاب‌های شما</span><h1>سبد خرید <small>{lines.length.toLocaleString("fa-IR")} کالا</small></h1></div><Link href="/categories" className="text-link">ادامه خرید <ArrowLeft size={16}/></Link></div>
    {!lines.length ? <div className="empty-state cart-empty"><span className="empty-icon"><ShoppingBag size={30}/></span><h2>سبد خرید شما خالی است</h2><p>هنوز کالایی به سبد خرید اضافه نکرده‌اید. از دسته‌بندی‌ها محصولات موردنظرتان را پیدا کنید.</p><Link className="button button-green" href="/categories">مشاهده محصولات <ArrowLeft size={16}/></Link></div> :
      <div className="cart-layout"><div className="cart-list">{lines.map(({ product, quantity, color, size }) => <article className="cart-line" key={`${product!.id}-${color || ""}-${size || ""}`}><Link href={`/product/${product!.slug}`} className="cart-image"><Image src={product!.image} alt={product!.name} fill sizes="94px"/></Link><div className="cart-line-info"><Link href={`/product/${product!.slug}`}><h2>{product!.name}</h2></Link><span>{product!.brand}{color ? ` · ${color}` : ""}{size ? ` · سایز ${size}` : ""}</span><b>{formatPrice(product!.price)}</b></div><div className="cart-line-controls"><div className="quantity-picker"><button onClick={() => updateQuantity(product!.id, quantity - 1, color, size)} aria-label="کم کردن"><Minus size={14}/></button><span>{quantity.toLocaleString("fa-IR")}</span><button onClick={() => updateQuantity(product!.id, Math.min(product!.stock, quantity + 1), color, size)} aria-label="زیاد کردن" disabled={quantity >= product!.stock}><Plus size={14}/></button></div><button className="remove-line" onClick={() => removeFromCart(product!.id, color, size)}><Trash2 size={15}/> حذف</button></div></article>)}</div>
        <aside className="cart-summary"><h2>خلاصه سفارش</h2><div><span>جمع کالاها</span><b>{formatPrice(subtotal)}</b></div><div><span>هزینه ارسال</span><b>{shipping ? formatPrice(shipping) : subtotal ? "رایگان" : "—"}</b></div>{subtotal > 0 && subtotal < 5000000 && <small className="shipping-hint">برای سفارش بالای ۵ میلیون تومان ارسال رایگان است.</small>}<div className="summary-total"><span>مبلغ قابل پرداخت</span><b>{formatPrice(subtotal + shipping)}</b></div><Link className="button button-green full-button" href="/checkout">ادامه فرایند خرید <ArrowLeft size={17}/></Link><small className="demo-caption">پرداخت در این نسخه انجام نمی‌شود.</small></aside>
      </div>}
  </div>;
}
