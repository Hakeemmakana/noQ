// src/validations/categoryValidation.ts
import type { CategoryFormData } from "../types/categoryTypes";

export type CategoryFormErrors = {
  name?: string;
  description?: string;
  status?: string;
};

const startsWithLetter = /^[A-Za-z]/;

export function validateCategoryForm(data: CategoryFormData): CategoryFormErrors {
  const errors: CategoryFormErrors = {};

  const name = data.name.trim();
  const description = data.description.trim();

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  } else if (!startsWithLetter.test(name)) {
    errors.name = "Name must start with a letter";
  }

  if (!description) {
    errors.description = "Description is required";
  } else if (description.length < 3) {
    errors.description = "Description must be at least 3 characters";
  } else if (!startsWithLetter.test(description)) {
    errors.description = "Description must start with a letter";
  }

  return errors;
}