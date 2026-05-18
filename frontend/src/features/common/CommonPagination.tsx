

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  limitOptions?: number[];
};

function getPageNumbers(currentPage: number, totalPages: number): Array<number | "..."> {
  const pages: Array<number | "..."> = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

export default function CommonPagination({
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
  limitOptions = [5, 10, 20],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = total === 0 ? 0 : Math.min(currentPage * limit, total);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pages = getPageNumbers(currentPage, totalPages);

  if (total <= 0) return null;

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-start">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{startItem}</span>
            {" - "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">{endItem}</span>
            {" "}of{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">{total}</span>
          </p>

          {onLimitChange && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                Rows:
              </label>
              <select
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                {limitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Page <span className="font-semibold text-slate-900 dark:text-slate-100">{currentPage}</span>
            {" "}of{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">{totalPages}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => hasPrev && onPageChange(currentPage - 1)}
              disabled={!hasPrev}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Prev
            </button>

            <div className="flex flex-wrap items-center gap-2">
              {pages.map((item, index) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="inline-flex h-10 min-w-[40px] items-center justify-center px-2 text-sm font-medium text-slate-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onPageChange(item)}
                    className={`inline-flex h-10 min-w-[40px] items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
                      currentPage === item
                        ? "bg-sky-600 text-white shadow-sm"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => hasNext && onPageChange(currentPage + 1)}
              disabled={!hasNext}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}