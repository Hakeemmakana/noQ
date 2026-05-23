// src/modules/product/utils/productValidation.ts
import type { ProductFormValues } from "../types/productTypes";

export const validateProductForm = (values: ProductFormValues) => {
  const errors: Partial<Record<keyof ProductFormValues, string>> = {};

  if (!values.productName.trim()) errors.productName = "Product name is required";
  if (!values.category) errors.category = "Category is required";
  if (!values.description.trim()) errors.description = "Description is required";

  if (!values.price.trim()) {
    errors.price = "Price is required";
  } else if (Number(values.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (!values.status) errors.status = "Status is required";
  if (!values.type) errors.type = "Type is required";

  if (values.type === "stock") {
    if (!values.stock.trim()) {
      errors.stock = "Stock is required";
    } else if (Number(values.stock) < 0) {
      errors.stock = "Stock must be 0 or more";
    }
  }

  return errors;
};