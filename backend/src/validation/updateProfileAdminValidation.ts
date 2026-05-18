
 type Field = {
  restaurantName?: string;
  phone: string;
  fullAddress:string;
  location:string;
};
type RFieldErrors={
  errors:Record<string,string>;
  isValid:boolean;
}

import { phoneRegex } from "../constants/regex";

export function validateAdminProfileForm(data:Field ): RFieldErrors {
  const errors: Record<string,string> = {};

  // Restaurant Name
  if (!data.restaurantName?.trim()) {
    errors.restaurantName = "Restaurant name is required";
  } else if (data.restaurantName.trim().length < 3) {
    errors.restaurantName = "Restaurant name must be at least 3 characters";
  }

  // Phone
  if (!data.phone?.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(data.phone.trim())) {
    errors.phone = "Phone must be 10 digits";
  } else if (!phoneRegex.test(data.phone.trim())) {
    errors.phone = "Enter a valid number";
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

  return{
    errors,
    isValid:Object.keys(errors).length===0
  }
}