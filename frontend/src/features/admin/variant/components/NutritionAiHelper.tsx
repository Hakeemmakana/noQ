import { Sparkles } from "lucide-react";
import { useState } from "react";
import { menuVariantService } from "../service/menuVariantService";
import type { INutrition } from "../types/menuVariantTypes";

type Props = {
  productName: string;
  variantName: string;
  onFill: (nutrition: INutrition) => void;
  disabled?: boolean;
};

export default function NutritionAiHelper({
  productName,
  variantName,
  onFill,
  disabled = false,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleAutofill = async () => {
    if (!productName.trim() || !variantName.trim()) return;
    try {
      setLoading(true);
      const nutrition = await menuVariantService.autoFillNutrition(productName, variantName);
      onFill(nutrition);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAutofill}
      disabled={disabled || loading || !productName.trim() || !variantName.trim()}
      className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-violet-900/40 dark:bg-violet-950/40 dark:text-violet-300"
    >
      <Sparkles className="h-4 w-4" />
      {loading ? "Generating..." : "AI Fill Nutrition"}
    </button>
  );
}