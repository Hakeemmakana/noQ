import adminApi from "../../../../services/adminApi";
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { INutrition, IProduct, IMenuVariantFormValues,  } from "../types/menuVariantTypes";

const USDA_API_KEY = import.meta.env.VITE_USDA_API_KEY as string | undefined;
const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

export const menuVariantService = {
  async getProductWithVariants(productId: string) {
    try {
      const res = await adminApi.get(`/${ADMIN_ROUTE}/menu/varient/${productId}`);
//       return Promise.resolve({
//     _id: '6a521d4897c6a8366d7b3c1f',
//     name: 'merinda',
//     image: 'https://noqbucket.s3.amazonaws.com/uploads/1783766343520-merind.webp',
//     price: 45,
//     stock: 44,
//     stockMode:"SHARED" as StockMode,
//     varient: []
//   })
      return res?.data?.data as IProduct;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async addVariant(productId: string, data: FormData) {
    try {
      const res = await adminApi.post(`/${ADMIN_ROUTE}/menu/varient/${productId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async editVariant(productId: string, variantId: string, data: FormData) {
    try {
      const res = await adminApi.put(`/${ADMIN_ROUTE}/menu/${productId}/variants/${variantId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async deleteVariant(productId: string, variantId: string) {
    try {
      const res = await adminApi.delete(`/${ADMIN_ROUTE}/menu/${productId}/variants/${variantId}`);
      return res?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  toFormData(values: IMenuVariantFormValues, stockMode: "SHARED" | "PER_VARIANT") {
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("image", values.image || "");
    fd.append("price", String(values.price));

    if (stockMode === "PER_VARIANT") fd.append("stock", String(values.stock));
    if (stockMode === "SHARED") fd.append("stockFactor", String(values.stockFactor));

    fd.append("nutrition", JSON.stringify(values.nutrition));
    return fd;
  },

  async autoFillNutrition(productName: string, variantName: string): Promise<INutrition> {
    if (!USDA_API_KEY) {
      throw new Error("Missing USDA API key. Add VITE_USDA_API_KEY to your environment.");
    }

    const query = `${productName} ${variantName}`.trim();
    const searchRes = await fetch(
      `${USDA_BASE_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}&pageSize=1`
    );
    const searchJson = await searchRes.json();
    const food = searchJson?.foods?.[0];

    if (!food?.fdcId) {
      return emptyNutritionResponse();
    }

    const detailRes = await fetch(`${USDA_BASE_URL}/food/${food.fdcId}?api_key=${USDA_API_KEY}`);
    const detailJson = await detailRes.json();

    const nutrition: INutrition = {
      servingSize: food.householdServingFullText || detailJson?.servingSize || "",
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    };

    for (const n of detailJson?.foodNutrients || []) {
      const name = String(n?.nutrient?.name ?? n?.nutrientName ?? "");
      const value = n?.amount ?? n?.value;
      if (value === undefined || value === null) continue;

      if (name === "Energy") nutrition.calories = Number(value);
      if (name === "Protein") nutrition.protein = Number(value);
      if (name === "Carbohydrate, by difference") nutrition.carbohydrates = Number(value);
      if (name === "Total lipid (fat)") nutrition.fat = Number(value);
      if (name === "Fiber, total dietary") nutrition.fiber = Number(value);
      if (name === "Sugars, total including NLEA") nutrition.sugar = Number(value);
      if (name === "Sodium, Na") nutrition.sodium = Number(value);
    }

    return nutrition;
  },
};

function emptyNutritionResponse(): INutrition {
  return {
    servingSize: "",
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  };
}