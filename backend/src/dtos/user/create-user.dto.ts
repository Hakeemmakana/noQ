export interface createUserDto{
    name:string;
    email:string;
    phone:string;
    password:string;
}

export interface updateUserProfileDto{
    name:string;
    phone:string;
    dob?:Date
}
export interface updateUserProfileInput{
    name:string;
    phone:string;
    dob?:string;
}
export function updateUserProfileFormateDto(data:updateUserProfileInput):updateUserProfileDto{
    return{
        name:data.name.trim(),
        phone:data.phone.trim(),
        ...(data.dob&&{dob:new Date(data.dob)})
    }
}