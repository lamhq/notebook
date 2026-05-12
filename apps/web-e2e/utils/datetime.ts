export function parseTimeString(timeStr: string): Date {
  // Create a base date (today)
  const today = new Date();

  // Use Date.parse with today's date + time string
  const parsed = Date.parse(`${today.toDateString()} ${timeStr}`);

  if (isNaN(parsed)) {
    throw new Error("Invalid time format. Use 'hh:mm am/pm'.");
  }

  return new Date(parsed);
}
