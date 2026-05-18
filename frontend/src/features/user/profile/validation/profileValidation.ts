// src/validations/profileValidation.ts
import { phoneRegex } from "../../../../constants/regex";
import type { FieldErrors, ProfileFormData } from "../types/profileTypes";

export function validateProfileForm(data: ProfileFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(data.phone.trim())) {
    errors.phone = "Phone must be 10 to digits";
  }else if(!phoneRegex.test(data.phone.trim())){
    errors.phone='Enter a valid number'
  }
  if (data.dob) {
    const selectedDate = new Date(data.dob);
    const today = new Date();

    // Remove time for accurate comparison
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      errors.dob = "Date of birth cannot be in the future";
    }
  }

  return errors;
}