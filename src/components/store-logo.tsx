import Link from "next/link";
import Image from "next/image";
import { storeName } from "@/data/store";

export function StoreLogo({ footer = false }: { footer?: boolean }) {
  return <Link href="/" className={`brand ${footer ? "footer-brand" : ""}`} aria-label={`صفحه اصلی ${storeName}`}>
    <span className="brand-mark" aria-hidden="true">
      <Image src={footer ? "/images/branding/store-logo-compact.png" : "/images/branding/store-logo-compact.svg"} alt="" fill sizes="46px" className="brand-mark-image"/>
    </span>
    <span className="brand-name"><b>{storeName.split(" ")[0]}</b><small>{storeName.split(" ").slice(1).join(" ")}</small></span>
  </Link>;
}
