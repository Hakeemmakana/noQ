import { ImageOff } from "lucide-react";
import type { IMenuItem, IMenuVariant } from "../types/menuProductType";

interface ProductGalleryProps {
  product: IMenuItem;
  variants: IMenuVariant[];
  selectedVariant: IMenuVariant | null;
  selectedIndex: number;
  onSelectVariant: (index: number) => void;
}

export default function ProductGallery({
  product,
  variants,
  selectedVariant,
  selectedIndex,
  onSelectVariant,
}: ProductGalleryProps) {
  const mainImage = selectedVariant?.image || product.itemImage;
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex aspect-square items-center justify-center sm:aspect-[4/3]">
          {mainImage ? (
            <img
              src={mainImage}
              alt={selectedVariant?.name || product.itemName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-400">
              <ImageOff className="h-10 w-10" />
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>
      </div>

      {variants.length > 0 && (
        <div className="mt-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Available variants
            </h2>

            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {variants.length} option{variants.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {variants.map((variant, index) => {
              const image = variant.image || product.itemImage;
              const isSelected = selectedIndex === index;
              const isOutOfStock =
                variant.status === "out_of_stock" ||
                (product.stockMode === "PER_VARIANT" &&
                  (variant.stock ?? 0) <= 0);

              return (
                <button
                  key={String(variant._id ?? `${variant.name}-${index}`)}
                  type="button"
                  onClick={() => onSelectVariant(index)}
                  className={`overflow-hidden rounded-2xl border text-left transition ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-100 dark:border-blue-500 dark:ring-blue-950"
                      : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                  }`}
                >
                  <div className="aspect-square bg-zinc-100 dark:bg-zinc-800">
                    {image ? (
                      <img
                        src={image}
                        alt={variant.name}
                        className={`h-full w-full object-cover ${
                          isOutOfStock ? "opacity-50 grayscale" : ""
                        }`}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                      {variant.name}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      ₹{variant.price}
                    </p>

                    {isOutOfStock && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        Out of stock
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}