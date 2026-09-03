// // src/modules/product/utils/productValidation.ts
// import type { ProductFormValues } from "../types/productTypes";

// export const validateProductForm = (values: ProductFormValues) => {
//   const errors: Partial<Record<keyof ProductFormValues, string>> = {};
//   if (!values.productName.trim()) errors.productName = "Product name is required";
//   if (!values.category) errors.category = "Category is required";
//   if (!values.description.trim()) errors.description = "Description is required";

//   if (!values.price.trim()) {
//     errors.price = "Price is required";
//   } else if (Number(values.price) <= 0) {
//     errors.price = "Price must be greater than 0";
//   }

//   if (!values.status) errors.status = "Status is required";
//   if (!values.type) errors.type = "Type is required";
//     if (!values.stock.trim()) {
//       errors.stock = "Stock is required";
//     } else if (Number(values.stock) < 0) {
//       errors.stock = "Stock must be 0 or more";
//     }
//   return errors;
// };

import type { ProductFormValues } from "../types/productTypes";

export const validateProductForm = (
  form: ProductFormValues,
  isEdit: boolean
): Partial<Record<keyof ProductFormValues, string>> => {
  const errors: Partial<Record<keyof ProductFormValues, string>> = {};

  if (!form.productName.trim()) errors.productName = "Product name is required";
  if (!form.category) errors.category = "Category is required";
  if (!form.description.trim()) errors.description = "Description is required";
  if (!form.type) errors.type = "Type is required";
  if (!form.stockMode) errors.stockMode = "Stock mode is required";
  if (!form.status) errors.status = "Status is required";

  if (form.stockMode === "SHARED") {
    if (!form.stock || Number(form.stock) < 0) {
      errors.stock = "Shared stock is required";
    }
  }

  if (!isEdit && !form.productImage) {
    errors.productImage = "Product image is required";
  }

  return errors;
};