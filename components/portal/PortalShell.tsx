"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Bell, BookOpen, CalendarClock, CalendarDays, ClipboardCheck, CreditCard, GraduationCap, LayoutDashboard, LogOut, Menu, MessageSquareText, Settings2, UsersRound, X, type LucideIcon } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";
import type { Role } from "@/lib/supabase/database.types";
import { portalCopy, portalSections } from "@/lib/portal/labels";

const icons: LucideIcon[] = [LayoutDashboard, UsersRound, UsersRound, GraduationCap, BookOpen, CalendarDays, ClipboardCheck, ClipboardCheck, GraduationCap, CreditCard, Bell, Settings2];
const navIcon = (href: string, index: number): LucideIcon => href === "/portal/messages" ? MessageSquareText : icons[index] ?? LayoutDashboard;

export function PortalShell({ lang, role, roles = [role], name, currentPath, children }: { lang: "en" | "ar" | "fr"; role: Role; roles?: Role[]; name: string; currentPath: string; children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || currentPath;
  const routeRole: Role | undefined = pathname.includes("/portal/admin") ? "admin" : pathname.includes("/portal/teacher") ? "teacher" : pathname.includes("/portal/parent") ? "parent" : pathname.includes("/portal/student") ? "adult_student" : undefined;
  const activeRole = routeRole && (roles.includes(routeRole) || roles.includes("admin")) ? routeRole : role;
  const t = portalCopy[lang];
  const nav = portalSections(activeRole, lang);
  const mobileTargets: Record<Role, string[]> = {
    admin: ["/portal/admin", "/portal/admin/students", "/portal/admin/classes", "/portal/admin/attendance"],
    teacher: ["/portal/teacher", "/portal/teacher/classes", "/portal/teacher/attendance", "/portal/teacher/assignments"],
    parent: ["/portal/parent", "/portal/parent/schedule", "/portal/parent/assignments", "/portal/parent/progress"],
    adult_student: ["/portal/student", "/portal/student/schedule", "/portal/student/assignments", "/portal/student/progress"],
  };
  const mobileNav = mobileTargets[activeRole].map((href) => nav.find((item) => item.href === href)).filter((item) => item !== undefined);
  const isActive = (href: string) => {
    const fullHref = `/${lang}${href}`;
    const homeHref = `/${lang}/portal/${activeRole === "adult_student" ? "student" : activeRole}`;
    return fullHref === homeHref ? pathname === fullHref : pathname === fullHref || pathname.startsWith(fullHref + "/");
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => mobileDrawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)') ?? [];
    focusable()[0]?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [mobileMenuOpen]);

  return <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-[#F4FAFD] text-[#001A3F] md:flex">
    <aside className="hidden w-[248px] shrink-0 border-e border-[#DFEBF1] bg-white/85 px-4 py-5 md:flex md:flex-col">
      <Link href={`/${lang}`} className="px-3 text-sm font-black tracking-[0.18em] text-[#001A3F]">MUSBAK<span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.18em] text-[#7890A0]">International Academy</span></Link>
      <div className="mt-8 rounded-2xl bg-[#F4FAFD] p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#087CC1]">{t.role[activeRole]}</p><p className="mt-1 truncate text-sm font-semibold">{name}</p></div>
      <nav aria-label="Portal navigation" className="mt-5 flex-1 space-y-1">{nav.map((item, index) => { const Icon = navIcon(item.href, index); const active = isActive(item.href); return <Link key={item.href} href={`/${lang}${item.href}`} aria-current={active ? "page" : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] ${active ? "bg-[#E6F6FF] font-bold text-[#087CC1]" : "text-[#607C8E] hover:bg-[#F4FAFD] hover:text-[#001A3F]"}`}><Icon aria-hidden="true" className="h-4 w-4"/><span>{item[lang]}</span></Link>; })}</nav>
      <form action={signOutAction}><input type="hidden" name="lang" value={lang}/><button className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-[#607C8E] hover:bg-[#F4FAFD] focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><LogOut className="h-4 w-4" aria-hidden="true"/>{t.signOut}</button></form>
    </aside>
    {mobileMenuOpen && <><button type="button" aria-label={t.close} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-50 bg-[#001A3F]/30 md:hidden"/><div id="mobile-portal-navigation" ref={mobileDrawerRef} role="dialog" aria-modal="true" aria-label={t.menu} className="fixed inset-y-0 start-0 z-[51] flex w-[min(21rem,88vw)] flex-col border-e border-[#DDEBF2] bg-white px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-[max(env(safe-area-inset-top),1rem)] shadow-2xl md:hidden"><div className="flex items-center justify-between border-b border-[#EAF1F5] pb-4"><Link href={`/${lang}`} onClick={() => setMobileMenuOpen(false)} className="text-sm font-black tracking-[0.18em]">MUSBAK<span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.18em] text-[#7890A0]">International Academy</span></Link><button type="button" data-mobile-menu-close onClick={() => setMobileMenuOpen(false)} aria-label={t.close} className="flex h-11 w-11 items-center justify-center rounded-xl text-[#607C8E] hover:bg-[#F4FAFD] focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><X className="h-5 w-5" aria-hidden="true"/></button></div><div className="mt-5 rounded-2xl bg-[#F4FAFD] p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#087CC1]">{t.role[activeRole]}</p><p className="mt-1 truncate text-sm font-semibold">{name}</p></div><nav aria-label="Portal navigation" className="mt-4 flex-1 space-y-1 overflow-y-auto">{nav.map((item, index) => { const Icon = navIcon(item.href, index); const active = isActive(item.href); return <Link key={item.href} href={`/${lang}${item.href}`} onClick={() => setMobileMenuOpen(false)} aria-current={active ? "page" : undefined} className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-[#35B8FF] ${active ? "bg-[#E6F6FF] font-bold text-[#087CC1]" : "text-[#607C8E] hover:bg-[#F4FAFD]"}`}><Icon aria-hidden="true" className="h-4 w-4 shrink-0"/><span>{item[lang]}</span></Link>; })}</nav><form action={signOutAction} className="mt-3 border-t border-[#EAF1F5] pt-3"><input type="hidden" name="lang" value={lang}/><button className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-[#607C8E] hover:bg-[#F4FAFD] focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><LogOut className="h-4 w-4" aria-hidden="true"/>{t.signOut}</button></form></div></>}
    <div className="min-w-0 flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#DFEBF1] bg-white/90 px-4 backdrop-blur-lg sm:px-7">
        <div className="flex items-center gap-2 md:hidden"><button ref={menuButtonRef} type="button" aria-label={t.menu} aria-expanded={mobileMenuOpen} aria-controls={mobileMenuOpen ? "mobile-portal-navigation" : undefined} onClick={() => setMobileMenuOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-xl text-[#31566C] hover:bg-[#F4FAFD] focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><Menu className="h-5 w-5" aria-hidden="true"/></button><Link href={`/${lang}`} className="text-xs font-black tracking-[0.18em]">MUSBAK</Link></div>
        <div className="hidden text-xs font-semibold text-[#7A91A0] md:block">{t.role[activeRole]}</div>
        <div className="ms-auto flex items-center gap-3"><span className="hidden max-w-48 truncate text-sm font-semibold sm:inline">{name}</span><Link href={`/${lang}/portal/notifications`} aria-label={t.notifications} className="flex h-10 w-10 items-center justify-center rounded-full text-[#607C8E] hover:bg-[#F4FAFD] focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><Bell className="h-4 w-4" aria-hidden="true"/></Link><span aria-label={t.role[activeRole]} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#DDF4FF] to-[#74CFFF] text-xs font-black text-[#07518B] ring-2 ring-white">{name.slice(0,2).toUpperCase()}</span><form action={signOutAction} className="md:hidden"><input type="hidden" name="lang" value={lang}/><button aria-label={t.signOut} className="flex h-10 w-10 items-center justify-center rounded-full text-[#607C8E] hover:bg-[#F4FAFD] focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><LogOut className="h-4 w-4"/></button></form></div>
      </header>
      <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8">{children}</main>
      <nav aria-label="Mobile portal navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D8EAF3] bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-lg md:hidden"><div className="mx-auto flex max-w-xl items-stretch justify-around">{mobileNav.map((item) => { const index = nav.findIndex((navItem) => navItem.href === item.href); const Icon = navIcon(item.href, index); const active = isActive(item.href); return <Link key={item.href} href={`/${lang}${item.href}`} aria-current={active ? "page" : undefined} className={`flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-semibold focus-visible:outline-2 focus-visible:outline-[#35B8FF] ${active ? "text-[#087CC1]" : "text-[#6B8494]"}`}><Icon className="h-4 w-4" aria-hidden="true"/><span className="max-w-full truncate">{item[lang]}</span></Link>; })}<button type="button" aria-label={t.menu} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(true)} className={`flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-semibold focus-visible:outline-2 focus-visible:outline-[#35B8FF] ${mobileMenuOpen ? "text-[#087CC1]" : "text-[#6B8494]"}`}><Menu className="h-4 w-4" aria-hidden="true"/><span className="max-w-full truncate">{t.more}</span></button></div></nav>
    </div>
  </div>;
}

export function PageHeading({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1680B9]">MUSBAK ACADEMY</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#698394]">{description}</p>}</div>{action}</div>;
}

type MetricIconName = "users" | "graduation" | "calendar" | "check" | "credit" | "trend";
const metricIcons: Record<MetricIconName, LucideIcon> = { users: UsersRound, graduation: GraduationCap, calendar: CalendarClock, check: ClipboardCheck, credit: CreditCard, trend: ArrowUpRight };

export function MetricCard({ label, value, hint, icon }: { label: string; value: string | number; hint?: string; icon?: MetricIconName }) {
  const Icon = icon ? metricIcons[icon] : undefined;
  return <article className="rounded-2xl border border-[#E4EEF3] bg-white p-5 shadow-[0_8px_25px_rgba(0,40,70,0.04)]"><div className="flex items-start justify-between gap-3"><p className="text-xs font-semibold text-[#718A9A]">{label}</p>{Icon && <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F7FF] text-[#087CC1]"><Icon aria-hidden="true" className="h-4 w-4"/></span>}</div><p className="mt-3 text-3xl font-bold tracking-tight text-[#001A3F]">{value}</p>{hint && <p className="mt-1 text-xs text-[#8BA0AD]">{hint}</p>}</article>;
}

export function Notice({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "amber" | "red" }) {
  const style = tone === "amber" ? "border-amber-200 bg-amber-50 text-amber-950" : tone === "red" ? "border-red-200 bg-red-50 text-red-900" : "border-[#D8EAF3] bg-[#EAF7FF] text-[#164B6D]";
  return <div role="status" className={`rounded-2xl border p-4 text-sm leading-6 ${style}`}>{children}</div>;
}
