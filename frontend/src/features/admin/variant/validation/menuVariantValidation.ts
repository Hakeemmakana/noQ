import type { IMenuVariantFormValues, StockMode } from "../types/menuVariantTypes";

export interface MenuVariantValidationErrors {
  name?: string;
  image?: string;
  price?: string;
  stock?: string;
  stockFactor?: string;
  nutrition?: {
    servingSize?: string;
    calories?: string;
    protein?: string;
    carbohydrates?: string;
    fat?: string;
    fiber?: string;
    sugar?: string;
    sodium?: string;
  };
}

export function validateMenuVariantForm(
  values: IMenuVariantFormValues,
  stockMode: StockMode
): MenuVariantValidationErrors {
  const errors: MenuVariantValidationErrors = {};

  const name = values.name.trim();
  if (!/^[A-Za-z0-9 ]{3,}$/.test(name)) {
    errors.name = "Name must contain only letters and spaces, and be at least 3 characters.";
  }

  if (values.price === undefined || values.price === null || Number.isNaN(values.price) || values.price <= 0) {
    errors.price = "Price must be a number greater than 0.";
  }

  if (stockMode === "PER_VARIANT") {
    if (values.stock === undefined || values.stock === null || Number.isNaN(values.stock) || values.stock < 0) {
      errors.stock = "Stock must be a valid number.";
    }
  }

  if (stockMode === "SHARED") {
    if (
      values.stockFactor === undefined ||
      values.stockFactor === null ||
      Number.isNaN(values.stockFactor) ||
      values.stockFactor <= 0
    ) {
      errors.stockFactor = "Stock factor must be a number greater than 0.";
    }
  }

  return errors;
}