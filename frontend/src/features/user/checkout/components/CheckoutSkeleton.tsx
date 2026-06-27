const CheckoutSkeleton = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_420px]">
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex gap-4">
              <div className="h-20 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="h-5 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 space-y-4">
          <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;