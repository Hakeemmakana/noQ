import type { IMenuNutrition } from "../types/menuProductType";

interface ProductNutritionProps {
  nutrition?: IMenuNutrition;
}

const nutritionItems = [
  {
    key: "calories",
    label: "Calories",
    unit: "kcal",
  },
  {
    key: "protein",
    label: "Protein",
    unit: "g",
  },
  {
    key: "carbohydrates",
    label: "Carbohydrates",
    unit: "g",
  },
  {
    key: "fat",
    label: "Fat",
    unit: "g",
  },
  {
    key: "fiber",
    label: "Fiber",
    unit: "g",
  },
  {
    key: "sugar",
    label: "Sugar",
    unit: "g",
  },
  {
    key: "sodium",
    label: "Sodium",
    unit: "mg",
  },
] as const;

export default function ProductNutrition({
  nutrition,
}: ProductNutritionProps) {
  if (!nutrition) return null;

  const hasNutrition = nutritionItems.some(
    ({ key }) => nutrition[key] !== undefined && nutrition[key] !== null
  );

  if (!hasNutrition && !nutrition.servingSize) return null;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
          Nutrition information
        </h2>

        {nutrition.servingSize && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Serving size: {nutrition.servingSize}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {nutritionItems.map(({ key, label, unit }) => {
          const value = nutrition[key];

          if (value === undefined || value === null) return null;

          return (
            <div
              key={key}
              className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/70"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                {value}
                <span className="ml-1 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                  {unit}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}