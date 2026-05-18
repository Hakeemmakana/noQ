// src/validations/categoryValidation.ts

import { ICreateCategoryDto } from "../dtos/admin/category/category-create.dto";


export type CategoryFormErrors = {
  name?: string;
  description?: string;
  status?: string;
  
};
export type ValidationResult = {
  isValid: boolean;
  errors: CategoryFormErrors;
};

const startsWithLetter = /^[A-Za-z]/;

export function validateCategoryForm(data: ICreateCategoryDto): ValidationResult {
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

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}