/**
 * The copyright year is read once and cached.
 *
 * With Cache Components enabled, reading the clock during a prerender is an
 * "unstable value" — it would differ between the build and every later
 * visit. Caching it keeps the value stable for the lifetime of the build
 * while still tracking the calendar year.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}
