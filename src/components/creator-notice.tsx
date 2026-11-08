"use client";

import { BadgeInfo, ExternalLink, X } from "lucide-react";
import { useSyncExternalStore } from "react";

const noticeKey = "emerald-creator-notice-dismissed";
const noticeChangeEvent = "creator-notice-change";
let dismissedInMemory = false;

function subscribeToNotice(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(noticeChangeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(noticeChangeEvent, callback);
  };
}

function shouldShowNotice() {
  try {
    return localStorage.getItem(noticeKey) !== "true";
  } catch {
    return !dismissedInMemory;
  }
}

export function CreatorNotice() {
  const isOpen = useSyncExternalStore(subscribeToNotice, shouldShowNotice, () => false);

  function dismissNotice() {
    try {
      localStorage.setItem(noticeKey, "true");
    } catch {
      dismissedInMemory = true;
    }
    window.dispatchEvent(new Event(noticeChangeEvent));
  }

  if (!isOpen) return null;

  return (
    <div className="creator-notice-backdrop">
      <section
        aria-labelledby="creator-notice-title"
        aria-modal="true"
        className="creator-notice"
        role="dialog"
      >
        <button
          aria-label="بستن اطلاعیه"
          className="creator-notice-close"
          onClick={dismissNotice}
          type="button"
        >
          <X size={19} />
        </button>
        <div className="creator-notice-icon"><BadgeInfo size={25} /></div>
        <p className="creator-notice-eyebrow">اطلاعیه مهم</p>
        <h2 id="creator-notice-title">درباره این وب‌سایت</h2>
        <p className="creator-notice-copy">
          این وب‌سایت یک قالب نمایشی است که توسط <strong>سجاد فرق‌یاری</strong> طراحی شده است.
          این سایت فروشگاه واقعی یا تجاری نیست و نام‌ها، کالاها و اطلاعات درج‌شده صرفاً نمونه هستند.
        </p>
        <a
          className="creator-notice-link"
          href="https://sajadfarghyari.ir"
          rel="noreferrer"
          target="_blank"
        >
          sajadfarghyari.ir <ExternalLink size={15} />
        </a>
        <button className="creator-notice-confirm" onClick={dismissNotice} type="button">
          متوجه شدم
        </button>
      </section>
    </div>
  );
}
