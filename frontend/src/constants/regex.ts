export const emailRegex:RegExp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordRegex:RegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
export const nameRegex:RegExp=/^[A-Za-z ]{3,}$/
export const phoneRegex: RegExp =/^(?:\+91)?[6-9]\d{9}$/
export const addressRegex: RegExp = /^[A-Za-z0-9\s,.-]{5,100}$/
export const slugRegex: RegExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/