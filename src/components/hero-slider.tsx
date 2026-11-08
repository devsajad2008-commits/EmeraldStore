"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowUpLeft, ChevronLeft, ChevronRight, CircleCheck, Sparkles, Truck } from "lucide-react";

const slides = [
  { eyebrow: "انتخاب‌های خوب، هر روز", first: "خریدی که", highlight: "حس خوبی", last: " دارد.", text: "از گجت‌های تازه تا جزئیات خانه؛ کالاهای موردنیازتان را با خیال راحت پیدا کنید.", action: "شروع خرید", href: "/categories", image: "/images/banners/home-slider-daily-shopping.webp" },
  { eyebrow: "قیمت‌های تازه رسیده‌اند", first: "یک انتخاب", highlight: "هوشمندانه", last: " نزدیک است.", text: "محصولات محبوب را بررسی کنید و برای خریدهای روزمره انتخابی به‌صرفه داشته باشید.", action: "دیدن تخفیف‌ها", href: "/deals", image: "/images/banners/home-slider-deals.webp" },
  { eyebrow: "خانه‌ای برای زندگی بهتر", first: "جزئیات کوچک،", highlight: "تغییر بزرگ", last: ".", text: "لوازم کاربردی و زیبا را از میان مجموعه متنوع خانه و آشپزخانه کشف کنید.", action: "کشف محصولات خانه", href: "/category/home-kitchen", image: "/images/banners/home-slider-home-kitchen.webp" },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const slide = slides[active];
  const selectSlide = (index: number) => {
    if (index === active) return;
    const forwardDistance = (index - active + slides.length) % slides.length;
    setDirection(forwardDistance <= slides.length / 2 ? "forward" : "backward");
    setActive(index);
  };
  const move = (offset: number) => selectSlide((active + offset + slides.length) % slides.length);

  return <section className="hero container" aria-roledescription="اسلایدر تبلیغاتی" aria-label="پیشنهادهای فروشگاه">
    <div key={`copy-${active}`} className={`hero-copy hero-slide-copy-${direction}`}><span className="hero-kicker"><Sparkles size={15}/>{slide.eyebrow}</span><h1>{slide.first}<br/><em>{slide.highlight}</em>{slide.last}</h1><p>{slide.text}</p><div className="hero-actions"><Link href={slide.href} className="button button-light">{slide.action} <ArrowLeft size={17}/></Link><Link href="/deals" className="hero-link">پیشنهادهای ویژه <ArrowUpLeft size={16}/></Link></div><div className="hero-proof"><span><CircleCheck size={16}/> انتخاب متنوع</span><span><Truck size={16}/> ارسال قابل پیگیری</span></div></div>
    <div className="hero-art"><Image key={`image-${active}`} src={slide.image} alt="" fill preload sizes="(max-width: 720px) 100vw, 50vw" className={`hero-art-image hero-art-image-${direction}`}/></div>
    <div className="hero-controls"><button onClick={() => move(-1)} aria-label="اسلاید قبلی"><ChevronRight size={17}/></button>{slides.map((item, index) => <button key={item.eyebrow} className={`hero-dot ${index === active ? "active" : ""}`} onClick={() => selectSlide(index)} aria-label={`نمایش اسلاید ${index + 1}`} aria-current={index === active ? "true" : undefined}></button>)}<button onClick={() => move(1)} aria-label="اسلاید بعدی"><ChevronLeft size={17}/></button><span>۰{active + 1} / ۰۳</span></div>
  </section>;
}
