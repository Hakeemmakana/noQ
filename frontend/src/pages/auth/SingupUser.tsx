import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from "../../assets/Logo";
import { emailRegex,nameRegex,phoneRegex } from '../../constants/regex';

interface InputFieldProps {
    label:string;
    type?:'text';
    placeholder:string;
    value:string;
    onChange:(e:string)=>void;
    icon:React.ReactNode;
    rightElement?:React.ReactNode;
    error?:string;

}
const InputField=({label,type='text',placeholder,value,onChange,rightElement,error,icon}:InputFieldProps)=>{
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


const SingupUser = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors: Record<string, string> = {};
  if (submitted) {
    if (!nameRegex.test(form.name.trim())) errors.name = "Enter a valid Name.";
    if (!emailRegex.test(form.email)) errors.email = "Enter a valid email address.";
    if (!phoneRegex.test(form.phone)) errors.phone = "Enter a valid phone number.";
    if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirm) errors.confirm = "Passwords do not match.";
  }

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)&&/[@$%]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-green-400"][strength];
  const strengthText = ["", "text-red-500", "text-amber-500", "text-blue-500", "text-green-500"][strength];

  const handleSubmit = () => {
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    console.log(form)
    setTimeout(() => setLoading(false), 1800);
  };

  const EyeIcon = ({ show }: { show: boolean }) =>
    show ? (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/60 to-slate-100 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 bg-white/70 backdrop-blur border-b border-white/80 shadow-sm">
        <Logo/>
        <a href="#" className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Support
        </a>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <div className="w-full max-w-lg">
          {/* Card */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-gray-200/60 border border-white/90 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500" />

            <div className="p-8 md:p-10">
              {/* Title */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 mb-4 shadow-inner">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h1>
                <p className="text-gray-400 text-sm mt-1.5">Join NoQ and skip the queue, always.</p>
              </div>

              {/* Form fields */}
              <div className="flex flex-col gap-4">
                <InputField
                  label="Full Name"
                  placeholder="hakeem"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />

                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="hakeemabc@gmail.com"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />

                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 (999) 000-0000"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  error={errors.phone}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-700">Password</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      placeholder="Min. 8 characters"
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className={`w-full pl-11 pr-12 py-3.5 rounded-2xl border text-sm text-gray-800 placeholder-gray-300 outline-none transition-all bg-gray-50/70 ${errors.password ? "border-red-300 focus:ring-2 focus:ring-red-300" : "border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white"}`}
                    />
                    <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-400 transition-colors">
                      <EyeIcon show={showPass} />
                    </button>
                  </div>

                  {/* Strength bar */}
                  {form.password && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-gray-100"}`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs font-bold ${strengthText}`}>{strengthLabel}</span>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-red-500 font-medium pl-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={form.confirm}
                      placeholder="Re-enter your password"
                      onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                      className={`w-full pl-11 pr-12 py-3.5 rounded-2xl border text-sm text-gray-800 placeholder-gray-300 outline-none transition-all bg-gray-50/70 ${errors.confirm ? "border-red-300 focus:ring-2 focus:ring-red-300" : form.confirm && form.confirm === form.password ? "border-green-300 focus:ring-2 focus:ring-green-300 bg-green-50/20" : "border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white"}`}
                    />
                    <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-400 transition-colors">
                      <EyeIcon show={showConfirm} />
                    </button>
                    {form.confirm && form.confirm === form.password && (
                      <div className="absolute right-12 top-1/2 -translate-y-1/2 text-green-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.confirm && <p className="text-xs text-red-500 font-medium pl-1">{errors.confirm}</p>}
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-400 text-center leading-relaxed mt-1">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-blue-500 font-semibold hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-blue-500 font-semibold hover:underline">Privacy Policy</a>.
                </p>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating your account...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Divider + Login link */}
            <div className="border-t border-gray-100 bg-gray-50/60 px-10 py-5 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to='/login' className="text-blue-500 font-bold hover:text-blue-600 transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <div className="flex items-center justify-center gap-5 mb-2">
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">Privacy Policy</a>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">Terms of Service</a>
        </div>
        <p className="text-xs text-gray-300">© 2024 NoQ Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SingupUser



