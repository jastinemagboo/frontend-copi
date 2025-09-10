export function dateFormat(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return ""; // invalid date

  const parts = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(d);

  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "";

  const month = get("month"); // e.g. "May"
  const day = String(Number(get("day"))); // "11" (no leading 0)
  const year = get("year"); // "2025"
  const hour = get("hour"); // "11"
  const minute = get("minute"); // "39"
  const meridiem = get("dayPeriod").toUpperCase(); // "PM"

  return `${month} ${day} ${year} at ${hour}:${minute} ${meridiem}`;
}
