// import React from 'react'

// const RegisterHotel = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default RegisterHotel


import { useState, useCallback, useRef, ChangeEvent, DragEvent, ReactNode } from "react";
import { addressRegex, emailRegex, phoneRegex, slugRegex } from "../../constants/regex";
import { Link } from "react-router-dom";
// ── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  restaurantName: string;
  slug: string;
  adminEmail: string;
  contactNumber: string;
  physicalAddress: string;
  banner: File | null;
  license: File | null;
}

type FormKey = keyof FormState;
type FormErrors = Partial<Record<FormKey, string>>;

// ── Helpers ──────────────────────────────────────────────────────────────────

const initialForm: FormState = {
  restaurantName: "",
  slug: "",
  adminEmail: "",
  contactNumber: "",
  physicalAddress: "",
  banner: null,
  license: null,
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.restaurantName.trim()) errors.restaurantName = "Restaurant name is required.";
  if (!form.slug.trim()) errors.slug = "Slug is required.";
  else if (!slugRegex.test(form.slug)) errors.slug = "Only lowercase letters, numbers, and hyphens.";
  if (!form.adminEmail.trim()) errors.adminEmail = "Admin email is required.";
  else if (!emailRegex.test(form.adminEmail)) errors.adminEmail = "Enter a valid email address.";
  if (!form.contactNumber.trim()) errors.contactNumber = "Contact number is required.";
  else if (!phoneRegex.test(form.contactNumber)) errors.contactNumber = "Enter a valid phone number.";
  if (!form.physicalAddress.trim()) errors.physicalAddress = "Physical address is required.";
  else if(!addressRegex.test(form.physicalAddress))errors.physicalAddress='Plese enter a valid address'
  if (!form.banner) errors.banner = "Please upload a restaurant banner.";
  if (!form.license) errors.license = "Please upload your business license or certificate.";
  return errors;
}

const inputClass = (hasError: boolean): string =>
  `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 bg-white
  ${hasError ? "border-red-400 focus:border-red-500 ring-2 ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`;

// ── Sub-components ───────────────────────────────────────────────────────────

interface UploadZoneProps {
  label: string;
  subLabel: string;
  icon: string;
  accept: string;
  file: File | null;
  error: string | null | undefined;
  onChange: (file: File) => void;
}

function UploadZone({ label, subLabel, icon, accept, file, error, onChange }: UploadZoneProps) {
  const [dragging, setDragging] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) onChange(dropped);
    },
    [onChange]
  );

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none
          ${dragging ? "border-blue-500 bg-blue-50" : error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/40"}`}
      >
        <div className={`text-4xl mb-3 transition-colors ${dragging ? "text-blue-500" : "text-gray-400"}`}>{icon}</div>
        {file ? (
          <p className="text-sm font-semibold text-blue-600 text-center break-all">{file.name}</p>
        ) : (
          <>
            <p className="text-sm font-semibold text-gray-700 text-center">{label}</p>
            <p className="text-xs text-gray-400 mt-1 text-center">{subLabel}</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && onChange(e.target.files[0])}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs ml-1 mt-0.5">{error}</p>}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function RestaurantRegister() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const set = (key: FormKey, val: string | File | null): void =>
    setForm((f) => ({ ...f, [key]: val }));

  const clearErr = (key: FormKey): void =>
    setErrors((prev) => ({ ...prev, [key]: "" }));

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    set("restaurantName", val);
    set("slug", slugify(val));
    clearErr("restaurantName");
    clearErr("slug");
  };

  const handleChange =
    (key: FormKey) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      set(key, e.target.value);
      clearErr(key);
    };

  const handleFile =
    (key: FormKey) =>
    (file: File): void => {
      set(key, file);
      clearErr(key);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => {
        document.querySelector(".error-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setSubmitted(true);
  };

  

  // ── Success Screen ─────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center max-w-md text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Submitted!</h2>
          <p className="text-gray-500 mb-8">
            <span className="text-blue-600 font-semibold">{form.restaurantName}</span> has been registered successfully.
            Our team will review your application shortly.
          </p>
          <button
            onClick={() => { setForm(initialForm); setErrors({}); setSubmitted(false); }}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Register Another
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.values(errors).some(Boolean);

  // ── Main Render ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #dde8f5 0%, #eef2f8 40%, #e8eef8 100%)" }}>

      {/* NAV */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">🍴</div>
          <span className="font-extrabold text-gray-900 text-lg tracking-tight">No  Q</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="hidden sm:inline">Already a partner?</span>
          <Link to='/login'
            type="button"
            className="px-5 py-2 border-2 border-gray-900 rounded-lg font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 text-sm"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="text-center pt-14 pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Register your <span className="text-blue-600">Restaurant</span>
        </h1>
        <p className="mt-4 text-gray-500 max-w-sm mx-auto text-base leading-relaxed">
          The modern way to manage bookings. Join our elite circle of restaurants today.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-2xl mx-auto px-4 pb-16">

        {/* Error Summary */}
        {hasErrors && (
          <div className="error-anchor mb-5 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-start gap-3">
            <span className="text-red-500 text-lg mt-0.5">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-red-700">Please fix the following errors:</p>
              <ul className="mt-1.5 list-disc list-inside space-y-0.5">
                {(Object.values(errors) as string[]).filter(Boolean).map((err, i) => (
                  <li key={i} className="text-xs text-red-600">{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-3xl shadow-lg border border-white/80 p-6 md:p-10 flex flex-col gap-7"
          style={{ boxShadow: "0 8px 40px 0 rgba(37,99,235,0.08)" }}
        >
          {/* BANNER UPLOAD */}
          <UploadZone
            label="Upload Restaurant Banner"
            subLabel="Drag and drop or click to browse"
            icon="📷"
            accept="image/*"
            file={form.banner}
            error={errors.banner}
            onChange={handleFile("banner")}
          />

          {/* RESTAURANT NAME */}
          <Field label="Restaurant Name" error={errors.restaurantName}>
            <input
              type="text"
              placeholder="e.g. Lumina Gastrobar"
              value={form.restaurantName}
              onChange={handleNameChange}
              className={inputClass(!!errors.restaurantName)}
            />
          </Field>

          {/* SLUG */}
          <Field label="Restaurant Slug (URL)" error={errors.slug}>
            <div
              className={`flex items-center rounded-xl border bg-white overflow-hidden transition-all duration-200
                ${errors.slug ? "border-red-400 ring-2 ring-red-100" : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"}`}
            >
              <span className="pl-4 pr-1 text-sm text-gray-400 whitespace-nowrap select-none shrink-0">
                notq.com/restaurant/
              </span>
              <input
                type="text"
                value={form.slug}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { set("slug", e.target.value); clearErr("slug"); }}
                className="flex-1 py-3 pr-4 text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 min-w-0"
                placeholder="lumina-gastrobar"
              />
            </div>
          </Field>

          {/* EMAIL + PHONE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Admin Email" error={errors.adminEmail}>
              <input
                type="email"
                placeholder="contact@example.com"
                value={form.adminEmail}
                onChange={handleChange("adminEmail")}
                className={inputClass(!!errors.adminEmail)}
              />
            </Field>
            <Field label="Contact Number" error={errors.contactNumber}>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.contactNumber}
                onChange={handleChange("contactNumber")}
                className={inputClass(!!errors.contactNumber)}
              />
            </Field>
          </div>

          {/* PHYSICAL ADDRESS */}
          <Field label="Physical Address" error={errors.physicalAddress}>
            <textarea
              rows={3}
              placeholder="Enter the full street address..."
              value={form.physicalAddress}
              onChange={handleChange("physicalAddress")}
              className={`resize-none ${inputClass(!!errors.physicalAddress)}`}
            />
          </Field>

          {/* LOCATION */}
          

          {/* BUSINESS LICENSE */}
          <Field label="Hotel Certificate or Business License" error={errors.license}>
            <UploadZone
              label="Upload Hotel Certificate / Business License (PDF, JPG, PNG)"
              subLabel="Drag and drop your document here"
              icon="📄"
              accept=".pdf,.jpg,.jpeg,.png"
              file={form.license}
              error={null}
              onChange={handleFile("license")}
            />
          </Field>

          {/* SUBMIT */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-base rounded-2xl transition-all duration-200 tracking-wide"
              style={{ boxShadow: "0 4px 20px 0 rgba(37,99,235,0.25)" }}
            >
              Register Restaurant
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              By proceeding, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
              {" & "}
              <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </form>

        {/* SUPPORT */}
        <div className="text-center mt-8">
          
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 tracking-widest uppercase">
          © 2024 NotQ SaaS Platform. Digitalizing Hospitality.
        </p>
      </div>
    </div>
  );
}