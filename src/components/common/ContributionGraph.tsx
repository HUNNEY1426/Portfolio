import type { CSSProperties } from "react";
import { PROFILE } from "@/data/profile";
import { getContributions, type Contributions } from "@/lib/github";

/** Cell shade per GitHub level, as a share of the text colour, so it follows the theme. */
const SHADE = [0.07, 0.25, 0.45, 0.68, 0.92];
const MONTH = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
/** Phones show this many of the most recent weeks, so the cells stay readable. */
const MOBILE_WEEKS = 26;

/**
 * A quiet year of real GitHub activity: one line of context, month labels
 * and a grid that scales to its container. Each cell carries GitHub's own
 * label ("3 contributions on March 4th") as its tooltip.
 */
export function ContributionGrid({ data }: { data: Contributions | null }) {
  if (!data) {
    return (
      <p className="font-mono text-xs text-muted-subtle text-center">
        Activity is on{" "}
        <a href={PROFILE.github.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
          GitHub
        </a>
        .
      </p>
    );
  }

  const weeks = data.weeks;
  const count = weeks.length;
  const hiddenOnPhone = (w: number) => w < count - MOBILE_WEEKS;

  // A month label sits over the first week that starts in that month.
  const months = weeks.map((week, w) => {
    const first = week[0];
    const prev = weeks[w - 1]?.[0];
    if (!first) return null;
    const m = MONTH.format(new Date(`${first.date}T00:00:00Z`));
    return !prev || MONTH.format(new Date(`${prev.date}T00:00:00Z`)) !== m ? m : null;
  });

  const cols = { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` };
  const phoneCols = `repeat(${Math.min(MOBILE_WEEKS, count)}, minmax(0, 1fr))`;

  return (
    <figure className="w-full m-0" style={{ "--graph-cols": cols.gridTemplateColumns, "--graph-cols-phone": phoneCols } as CSSProperties}>
      <figcaption className="mb-3 flex items-baseline justify-between gap-4 font-mono text-[11px] text-muted-subtle">
        <a
          href={PROFILE.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface-variant hover:text-on-surface transition-colors"
        >
          github.com/{PROFILE.github.user}
        </a>
        <span>
          {data.total} contribution{data.total === 1 ? "" : "s"} in the last year
        </span>
      </figcaption>

      <div className="graph-grid mb-1.5 font-mono text-[10px] text-muted-subtle" aria-hidden="true">
        {months.map((m, w) => (
          <span key={w} className={`whitespace-nowrap overflow-visible ${hiddenOnPhone(w) ? "hidden sm:block" : ""}`}>
            {m ?? ""}
          </span>
        ))}
      </div>

      <div className="graph-grid gap-[3px]" role="img" aria-label={`${data.total} GitHub contributions in the last year`}>
        {weeks.map((week, w) => (
          <div key={w} className={`flex-col gap-[3px] ${hiddenOnPhone(w) ? "hidden sm:flex" : "flex"}`}>
            {week.map((day) => (
              <span
                key={day.date}
                title={day.label}
                className="block aspect-square rounded-[2px]"
                style={{ backgroundColor: `rgb(var(--on-surface) / ${SHADE[day.level]})` }}
              />
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}

/** Server wrapper: fetches the live calendar (cached hourly) and renders it. */
export async function ContributionGraph() {
  const data = await getContributions();
  return <ContributionGrid data={data} />;
}
