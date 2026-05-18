// src/validations/profileValidation.ts
import { phoneRegex } from "../../../../constants/regex";
import type { FieldErrors, ProfileFormData } from "../types/profileTypes";

export function validateProfileForm(data: ProfileFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.restaurantName.trim()) {
    errors.restaurantName = "restaurantName is required";
  } else if (data.restaurantName.trim().length < 3) {
    errors.restaurantName = "Name must be at least 3 characters";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(data.phone.trim())) {
    errors.phone = "Phone must be 10 to digits";
  }else if(!phoneRegex.test(data.phone.trim())){
    errors.phone='Enter a valid number'
  }
  // Full Address
  if (!data.fullAddress?.trim()) {
    errors.fullAddress = "Full address is required";
  } else if (data.fullAddress.trim().length < 10) {
    errors.fullAddress = "Full address must be at least 10 characters";
  }

  // Location
  if (!data.location?.trim()) {
    errors.location = "Location is required";
  } else if (data.location.trim().length < 3) {
    errors.location = "Location must be at least 3 characters";
  }

  return errors;
}