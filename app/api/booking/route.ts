import { NextResponse } from "next/server";
import { isValidSlot } from "@/lib/booking";
import { artist, lessonTypes } from "@/lib/site";

type Payload = {
  lessonId?: string;
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  level?: string;
  style?: string;
  timezone?: string;
  message?: string;
  locale?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  const lesson = lessonTypes.find((item) => item.id === body.lessonId);

  if (
    !lesson ||
    !body.date ||
    !body.time ||
    !body.name?.trim() ||
    !body.email?.includes("@") ||
    !isValidSlot(body.date, body.time)
  ) {
    return NextResponse.json({ error: "Invalid booking request" }, { status: 400 });
  }

  const locale = body.locale === "fr" ? "fr" : "en";
  const subject =
    locale === "fr"
      ? `Demande de cours — ${body.name} — ${body.date} ${body.time}`
      : `Lesson request — ${body.name} — ${body.date} ${body.time}`;

  const text = [
    locale === "fr" ? "Nouvelle demande de cours à distance" : "New remote lesson request",
    "",
    `${locale === "fr" ? "Formule" : "Format"}: ${lesson.duration} min — ${lesson.price} €`,
    `${locale === "fr" ? "Date" : "Date"}: ${body.date} ${body.time} (${bookingTimezoneLabel()})`,
    `${locale === "fr" ? "Élève" : "Student"}: ${body.name}`,
    `Email: ${body.email}`,
    `${locale === "fr" ? "Niveau" : "Level"}: ${body.level ?? ""}`,
    `${locale === "fr" ? "Styles" : "Styles"}: ${body.style ?? ""}`,
    `${locale === "fr" ? "Fuseau" : "Timezone"}: ${body.timezone ?? ""}`,
    "",
    body.message ?? "",
  ].join("\n");

  const mailto = `mailto:${artist.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  const whatsapp = `https://wa.me/${artist.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${text}`)}`;

  return NextResponse.json({ ok: true, mailto, whatsapp });
}

function bookingTimezoneLabel() {
  return "Europe/Amsterdam";
}
