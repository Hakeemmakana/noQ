import { phoneRegex, emailRegex, passwordRegex } from "../constants/regex";
import { createUserDto } from "../dtos/user/create-user.dto";
type logUser={
  email:string;
  password:string;
}

export const validateRegister = (data: createUserDto) => {
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

  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data:data
  };
};

export const validateLogin=(data:logUser)=>{
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
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data:data
  };

}