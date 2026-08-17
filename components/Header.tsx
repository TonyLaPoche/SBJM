"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/about", key: "about" },
  { href: "/music", key: "music" },
  { href: "/lessons", key: "lessons" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previous || "";
    document.documentElement.style.overflowX = "clip";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || open
            ? "border-line/80 bg-paper/95 shadow-[0_8px_30px_rgba(22,20,18,0.05)] backdrop-blur-md"
            : "border-transparent bg-paper/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4 md:px-8">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="display text-[1.65rem] leading-none transition-transform duration-300 group-hover:scale-[1.03] sm:text-2xl">
              SJ
            </span>
            <span className="hidden text-[0.68rem] tracking-[0.18em] uppercase text-ink-soft xs:block sm:text-[0.7rem]">
              Delacombaz
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-[0.74rem] tracking-[0.16em] uppercase xl:gap-8 xl:text-[0.78rem] lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1 transition-colors ${
                    active ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {t(link.key)}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <LanguageSwitcher />
            <Link
              href="/lessons"
              className="hidden border border-ink px-3.5 py-2 text-[0.68rem] tracking-[0.16em] uppercase transition-all duration-300 hover:bg-ink hover:text-paper lg:inline-block xl:px-4"
            >
              {t("book")}
            </Link>

            <button
              type="button"
              className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
              <span className="relative flex h-4 w-6 flex-col justify-between">
                <span
                  className={`block h-px w-full origin-center bg-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "translate-y-[7.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                  }`}
                />
                <span
                  className={`block h-px w-full origin-center bg-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "-translate-y-[7.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hors du header : backdrop-filter cassait le fixed et créait l'écart mobile */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[55] overflow-hidden lg:hidden ${
          open ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label={t("closeMenu")}
          className={`absolute inset-0 bg-ink/35 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 flex h-full w-[min(100vw,24rem)] max-w-full flex-col border-l border-line bg-paper px-6 pb-8 pt-24 shadow-[-20px_0_60px_rgba(22,20,18,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`display border-b border-line py-5 text-4xl transition-all duration-500 sm:text-5xl ${
                  open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div
            className={`mt-8 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "360ms" : "0ms" }}
          >
            <Link
              href="/lessons"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center border border-ink bg-ink px-5 py-4 text-center text-xs tracking-[0.18em] uppercase text-paper transition-colors hover:bg-transparent hover:text-ink"
            >
              {t("book")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
