interface UpdateProfileData {
  name: string;
  phone: string;
  dob?: Date;
}
interface validationErrorReturn{
    isValid:boolean,
    errors:Record<string, string> 
}

// interface ValidationErrors {
//   name?: string;
//   phone?: string;
//   dob?: string;
// }

export function validateUpdateProfile(
  data: UpdateProfileData
): validationErrorReturn {

  const errors: Record<string, string> = {};

  // Name Validation
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 3) {
    errors.name = "Name must contain at least 3 characters";
  }

  // Phone Validation
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(data.phone)) {
    errors.phone = "Invalid phone number";
  }

  // DOB Validation
  if (data.dob) {
    const dobDate = new Date(data.dob);
    const today = new Date();

    if (dobDate >= today) {
      errors.dob = "Invalid date of birth";
    }
  }

  return {
    isValid:Object.keys(errors).length===0,
    errors
  }
}