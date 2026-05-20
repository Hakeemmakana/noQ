import { ICreateReqStaff } from "../dtos/admin/staff/staff-create.dto";


export type StaffFormErrors = {
  name?: string;
  email?: string;
  password?: string;
};
type StaffFormErrorsReturn={
    errors:StaffFormErrors,
    isValid:boolean
}

const nameRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

export function validateStaffForm(data: ICreateReqStaff): StaffFormErrorsReturn {
  const errors: StaffFormErrors = {};

  const name = data.name.trim();
  const email = data.email.trim();
  const password = data.password.trim();

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  } else if (!nameRegex.test(name)) {
    errors.name = "Name should contain only letters and spaces";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must include uppercase, lowercase, number and special character";
  }

  return {
    errors,
    isValid:Object.keys(errors).length==0
  }
}