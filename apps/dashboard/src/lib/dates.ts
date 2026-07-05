import "server-only";

import type { DateRange } from "./types";

function partsInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

export function dateInTimeZone(date: Date, timeZone: string) {
  const parts = partsInTimeZone(date, timeZone);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0));

  return `${utc.getUTCFullYear()}-${String(utc.getUTCMonth() + 1).padStart(2, "0")}-${String(
    utc.getUTCDate(),
  ).padStart(2, "0")}`;
}

export function buildAdsDateRanges(timeZone: string, now = new Date()) {
  const today = dateInTimeZone(now, timeZone);
  const yesterday = addDays(today, -1);

  return {
    today: {
      label: "Bugün",
      startDate: today,
      endDate: today,
    },
    yesterday: {
      label: "Dün",
      startDate: yesterday,
      endDate: yesterday,
    },
    last7Days: {
      label: "Son 7 gün",
      startDate: addDays(today, -6),
      endDate: today,
    },
  } satisfies Record<string, DateRange>;
}

export function buildSearchConsoleDateRange(timeZone = "Europe/Istanbul", now = new Date()) {
  const today = dateInTimeZone(now, timeZone);
  const endDate = addDays(today, -1);

  return {
    label: "Son 7 gün",
    startDate: addDays(endDate, -6),
    endDate,
  } satisfies DateRange;
}

export function isSameOrAfter(date: string, threshold: string) {
  return date >= threshold;
}
