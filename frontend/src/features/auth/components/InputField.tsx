import React from 'react'

interface InputFieldProps {
    label:string;
    type?:'text'|'email'|'tel';
    placeholder:string;
    value:string;
    onChange:(e:string)=>void;
    icon:React.ReactNode;
    rightElement?:React.ReactNode;
    error?:string;

}
const InputField = ({label,type,placeholder,value,onChange,rightElement,error,icon}:InputFieldProps) => {
  return (
     <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-gray-700">{label}</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">{icon}</div>
            <input
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full pl-11 pr-${rightElement ? "12" : "4"} py-3.5 rounded-2xl border text-sm text-gray-800 placeholder-gray-300 outline-none transition-all bg-gray-50/70
                ${error ? "border-red-300 focus:ring-2 focus:ring-red-300 bg-red-50/30" : "border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white"}`}
            />
            {rightElement && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>
            )}
          </div>
          {error && <p className="text-xs text-red-500 font-medium pl-1">{error}</p>}
        </div>
  )
}

export default InputField
