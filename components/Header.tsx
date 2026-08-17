"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/about", key: "about" },
  { href: "/music", key: "music" },
  { href: "/lessons", key: "lessons" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="display text-2xl leading-none">SJ</span>
          <span className="hidden text-[0.7rem] tracking-[0.18em] uppercase text-ink-soft sm:block">
            Delacombaz
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[0.78rem] tracking-[0.16em] uppercase lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-soft transition-colors hover:text-ink"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageSwitcher />
          <Link
            href="/lessons"
            className="hidden border border-ink px-4 py-2 text-[0.72rem] tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-paper lg:inline-block"
          >
            {t("book")}
          </Link>
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span className="flex h-5 w-6 flex-col justify-between">
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm tracking-[0.16em] uppercase">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {t(link.key)}
              </Link>
            ))}
            <Link href="/lessons" onClick={() => setOpen(false)}>
              {t("book")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
