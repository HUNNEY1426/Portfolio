/**
 * Placeholder shown for an instant while an article or project page reads
 * its URL. Same frame and spacing as the real page, so nothing jumps.
 */
export function ArticleSkeleton() {
  const bar = "rounded-full bg-on-surface/[0.07] animate-pulse";
  return (
    <div className="railed relative w-full min-h-screen pt-28 pb-12" aria-busy="true" aria-label="Loading">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        <div className={`${bar} h-3 w-24`} />
        <div className={`${bar} h-10 w-4/5`} />
        <div className={`${bar} h-4 w-full`} />
        <div className={`${bar} h-4 w-2/3`} />
        <div className="mt-4 aspect-[16/9] w-full rounded-2xl bg-on-surface/[0.05] animate-pulse" />
      </div>
    </div>
  );
}
