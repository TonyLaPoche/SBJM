import { bookingConfig } from "./site";

export type BookingDay = {
  iso: string;
  label: string;
  weekday: string;
};

function formatInTimeZone(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: bookingConfig.timezone,
    ...options,
  }).format(date);
}

export function getAvailableDays(locale: string): BookingDay[] {
  const days: BookingDay[] = [];
  const now = new Date();

  for (let offset = 1; offset <= bookingConfig.daysAhead; offset += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + offset);

    const weekday = date.getDay();
    if (bookingConfig.closedWeekdays.includes(weekday)) continue;

    const iso = formatInTimeZone(date, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    days.push({
      iso,
      label: new Intl.DateTimeFormat(locale, {
        timeZone: bookingConfig.timezone,
        day: "numeric",
        month: "short",
      }).format(date),
      weekday: new Intl.DateTimeFormat(locale, {
        timeZone: bookingConfig.timezone,
        weekday: "short",
      }).format(date),
    });
  }

  return days;
}

export function isValidSlot(date: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  if (!bookingConfig.slots.includes(time as (typeof bookingConfig.slots)[number])) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));
  const weekday = candidate.getUTCDay();
  if (bookingConfig.closedWeekdays.includes(weekday)) return false;

  const today = formatInTimeZone(new Date(), {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return date > today;
}
