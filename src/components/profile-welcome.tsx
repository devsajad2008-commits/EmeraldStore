"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { useStore } from "@/components/store-provider";

export function ProfileWelcome() {
  const { userName, logout } = useStore();

  return <div className="profile-welcome"><span className="profile-avatar"><UserRound/></span><div><h2>{userName || "کاربر مهمان"}</h2><p>{userName ? "با نام کاربری نمایشی وارد شده‌اید." : "برای ورود، نام خود را وارد کنید."}</p></div>{userName ? <button type="button" className="button button-outline" onClick={logout}>خروج</button> : <Link href="/login" className="button button-outline">ورود</Link>}</div>;
}
