"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export function NewsletterForm({ wide = false }: { wide?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  return submitted
    ? <p className="newsletter-success" role="status">از همراهی شما ممنونیم؛ عضویت در این نسخه نمایشی ذخیره نمی‌شود.</p>
    : <form className={wide ? "newsletter-wide-form" : "newsletter-form"} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <input type="email" required placeholder={wide ? "آدرس ایمیل شما" : "ایمیل شما"} aria-label="ایمیل برای خبرنامه"/>
      <button type="submit">{wide ? "عضویت در خبرنامه" : "عضویت"} <ArrowLeft size={16}/></button>
    </form>;
}
