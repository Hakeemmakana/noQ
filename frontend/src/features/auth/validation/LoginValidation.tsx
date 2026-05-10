import { emailRegex } from "../../../constants/regex";
import { passwordRegex } from "../../../shared/constants/regex";

interface LoginInupt{
    email:string;
    password:string;
}
export const validateLogin=(data:LoginInupt)=>{
  const errors:string[]=[]
  // Email
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push( "Invalid email address");
  }
  // Password (regex added)
  if (!data.password || !passwordRegex.test(data.password)) {
    errors.push("Password must be at least 6 chars, include letter & number");
  }
  if(errors.length>0){
    return {errors:'Please fix the following errors:\n• ' + errors.join("\n• "),
        isValid:false};
  }

  return {errors:'',isValid:true};
}