type Props = {
  value: 2 | 4 | 6;
};

export default function CapacityBadge({ value }: Props) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {value} Seats
    </span>
  );
}