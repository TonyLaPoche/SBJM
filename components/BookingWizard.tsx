"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getAvailableDays } from "@/lib/booking";
import { bookingConfig, lessonTypes } from "@/lib/site";

type LessonId = (typeof lessonTypes)[number]["id"];

const lessonCopy = {
  discovery: { title: "discovery", text: "discoveryText" },
  standard: { title: "standard", text: "standardText" },
  extended: { title: "extended", text: "extendedText" },
} as const;

export function BookingWizard() {
  const t = useTranslations("lessons");
  const locale = useLocale();
  const days = useMemo(() => getAvailableDays(locale), [locale]);

  const [step, setStep] = useState(0);
  const [lessonId, setLessonId] = useState<LessonId>("standard");
  const [date, setDate] = useState(days[0]?.iso ?? "");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("beginner");
  const [style, setStyle] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [links, setLinks] = useState<{ mailto: string; whatsapp: string } | null>(
    null,
  );

  const lesson = lessonTypes.find((item) => item.id === lessonId) ?? lessonTypes[1];

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          date,
          time,
          name,
          email,
          level,
          style,
          timezone,
          message,
          locale,
        }),
      });

      const payload = (await response.json()) as {
        mailto?: string;
        whatsapp?: string;
      };

      if (!response.ok || !payload.mailto || !payload.whatsapp) {
        throw new Error("Booking failed");
      }

      setLinks({ mailto: payload.mailto, whatsapp: payload.whatsapp });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" && links) {
    return (
      <div className="border border-line bg-paper-deep/50 p-8">
        <p className="eyebrow">{t("bookTitle")}</p>
        <h3 className="display mt-4 text-4xl">{t("successTitle")}</h3>
        <p className="mt-4 max-w-xl text-ink-soft">{t("successText")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={links.mailto}
            className="border border-ink bg-ink px-5 py-3 text-xs tracking-[0.16em] uppercase text-paper"
          >
            {t("confirmEmail")}
          </a>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="border border-ink px-5 py-3 text-xs tracking-[0.16em] uppercase"
          >
            {t("confirmWhatsapp")}
          </a>
        </div>
        <button
          type="button"
          className="mt-6 text-sm text-ink-soft underline-offset-4 hover:underline"
          onClick={() => {
            setStatus("idle");
            setStep(0);
            setLinks(null);
          }}
        >
          {t("newRequest")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-line p-6 md:p-8">
      <div className="mb-8 flex flex-wrap gap-4 text-[0.7rem] tracking-[0.18em] uppercase text-ink-soft">
        {[t("stepType"), t("stepDate"), t("stepTime"), t("stepDetails")].map(
          (label, index) => (
            <span key={label} className={index === step ? "text-ink" : ""}>
              0{index + 1} {label}
            </span>
          ),
        )}
      </div>

      {step === 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {lessonTypes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLessonId(item.id)}
              className={`border p-5 text-left transition-colors ${
                lessonId === item.id
                  ? "border-ink bg-paper-deep"
                  : "border-line hover:border-ink"
              }`}
            >
              <p className="text-xs tracking-[0.16em] uppercase text-ink-soft">
                {t("minutes", { count: item.duration })}
              </p>
              <p className="mt-2 text-lg">{t(lessonCopy[item.id].title)}</p>
              <p className="mt-2 text-sm text-ink-soft">
                {t(lessonCopy[item.id].text)}
              </p>
              <p className="mt-4 text-sm">{item.price} €</p>
            </button>
          ))}
        </div>
      ) : null}

      {step === 1 ? (
        <div>
          <p className="mb-4 text-sm text-ink-soft">{t("timezoneNote")}</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {days.map((day) => (
              <button
                key={day.iso}
                type="button"
                onClick={() => setDate(day.iso)}
                className={`border px-2 py-3 text-center ${
                  date === day.iso
                    ? "border-ink bg-paper-deep"
                    : "border-line hover:border-ink"
                }`}
              >
                <span className="block text-[0.65rem] uppercase tracking-wider text-ink-soft">
                  {day.weekday}
                </span>
                <span className="mt-1 block text-sm">{day.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {bookingConfig.slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTime(slot)}
              className={`border px-3 py-3 ${
                time === slot
                  ? "border-ink bg-paper-deep"
                  : "border-line hover:border-ink"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            {t("name")}
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
            />
          </label>
          <label className="grid gap-2 text-sm">
            {t("email")}
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
            />
          </label>
          <label className="grid gap-2 text-sm">
            {t("level")}
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
            >
              <option value="beginner">{t("levels.beginner")}</option>
              <option value="intermediate">{t("levels.intermediate")}</option>
              <option value="advanced">{t("levels.advanced")}</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            {t("style")}
            <input
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              placeholder={t("stylePlaceholder")}
              className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
            />
          </label>
          <label className="grid gap-2 text-sm md:col-span-2">
            {t("timezone")}
            <input
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
            />
          </label>
          <label className="grid gap-2 text-sm md:col-span-2">
            {t("message")}
            <textarea
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t("messagePlaceholder")}
              className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
            />
          </label>
        </div>
      ) : null}

      {status === "error" ? (
        <p className="mt-4 text-sm text-bronze-deep">{t("error")}</p>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          className="text-sm text-ink-soft disabled:opacity-30"
          disabled={step === 0}
        >
          {t("back")}
        </button>
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((value) => value + 1)}
            disabled={step === 2 && !time}
            className="border border-ink bg-ink px-5 py-3 text-xs tracking-[0.16em] uppercase text-paper disabled:opacity-40"
          >
            {t("next")}
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "loading"}
            className="border border-ink bg-ink px-5 py-3 text-xs tracking-[0.16em] uppercase text-paper disabled:opacity-40"
          >
            {status === "loading" ? t("sending") : t("submit")}
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        {t(lessonCopy[lesson.id].title)} · {date} {time ? `· ${time}` : ""} ·{" "}
        {lesson.price} €
      </p>
    </form>
  );
}
