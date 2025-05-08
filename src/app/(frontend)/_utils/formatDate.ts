export function formatDate(iso: string) {
  if (!iso) return "";

  const date = new Date(iso);

  const datePart = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${datePart} @ ${timePart}`;
}
