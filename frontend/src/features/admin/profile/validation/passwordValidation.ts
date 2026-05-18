import type { FieldErrors } from "../types/profileTypes";

export function validatePasswordFlow(
  otp: string,
  password: string,
  confirmPassword: string
): FieldErrors {
  const errors: FieldErrors = {};

  if (!otp.trim()) {
    errors.otp = "OTP is required";
  } else if (!/^\d{4,6}$/.test(otp.trim())) {
    errors.otp = "OTP must be 4 to 6 digits";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "Password must include one uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    errors.password = "Password must include one lowercase letter";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "Password must include one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>_\-\\/[\];'`~+=]/.test(password)) {
    errors.password = "Password must include one special character";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}