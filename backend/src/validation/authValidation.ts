import { phoneRegex, emailRegex, passwordRegex } from "../constants/regex";

export const validateRegister = (data: any) => {
  const errors: Record<string,string>= {};

  // Full Name
  if (!data.name || data.name.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  // Email
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // Phone
  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.phone = "Invalid phone number";
  }

  // Password (regex added)
  if (!data.password || !passwordRegex.test(data.password)) {
    errors.password =
      "Password must be at least 6 chars, include letter & number";
  }

  // Confirm Password
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data:data
  };
};

export const validateLogin=(data:any)=>{
  const errors:Record<string,string>={}
  // Email
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Invalid email address";
  }
  // Password (regex added)
  if (!data.password || !passwordRegex.test(data.password)) {
    errors.password =
      "Password must be at least 6 chars, include letter & number";
  }
  if (!data.context||(data.context !== 'userLogin' && data.context !== 'adminLogin') ) {
    errors.context =
      'Invalid context';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data:data
  };

}