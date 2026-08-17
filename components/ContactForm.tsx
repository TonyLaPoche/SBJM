"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { artist } from "@/lib/site";

export function ContactForm() {
  const t = useTranslations("contact");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  const subject = encodeURIComponent(`Contact — ${firstName} ${lastName}`.trim());
  const body = encodeURIComponent(
    `${message}\n\n${firstName} ${lastName}\n${email}`,
  );
  const mailto = `mailto:${artist.email}?subject=${subject}&body=${body}`;
  const whatsapp = `https://wa.me/${artist.whatsapp}?text=${encodeURIComponent(
    `${firstName} ${lastName}\n${email}\n\n${message}`,
  )}`;

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setReady(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {t("firstName")}
          <input
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("lastName")}
          <input
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        {t("emailField")}
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
        />
      </label>
      <label className="grid gap-2 text-sm">
        {t("message")}
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
        />
      </label>
      {!ready ? (
        <button
          type="submit"
          className="justify-self-start border border-ink bg-ink px-5 py-3 text-xs tracking-[0.16em] uppercase text-paper"
        >
          {t("submit")}
        </button>
      ) : (
        <div className="flex flex-wrap gap-3">
          <p className="w-full text-sm text-ink-soft">{t("success")}</p>
          <a
            href={mailto}
            className="border border-ink bg-ink px-5 py-3 text-xs tracking-[0.16em] uppercase text-paper"
          >
            {t("openMail")}
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="border border-ink px-5 py-3 text-xs tracking-[0.16em] uppercase"
          >
            {t("whatsapp")}
          </a>
        </div>
      )}
    </form>
  );
}
