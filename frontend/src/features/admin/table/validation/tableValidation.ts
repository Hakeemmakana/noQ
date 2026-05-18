// src/pages/admin/validations/tableValidation.ts
import type { TableFormValues } from "../types/tableTypes";

export type TableFormErrors = {
  number?: string;
};

const tableNumberRegex = /^T/;

export function validateTableForm(values: TableFormValues): TableFormErrors {
  const errors: TableFormErrors = {};
  const number = values.number.trim();

  if (!number||number.length<2) {
    errors.number = "Table number is required";
  } else if (!tableNumberRegex.test(number)) {
    errors.number = "Table number must start with T";
  }

  return errors;
}