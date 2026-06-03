// src/modules/menu/components/MenuSkeleton.tsx
export default function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-48 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}