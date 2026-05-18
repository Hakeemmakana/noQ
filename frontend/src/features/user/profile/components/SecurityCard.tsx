// src/components/profile/components/SecurityCard.tsx
import type { FieldErrors } from "../types/profileTypes";

type PasswordStep = "idle" | "otp" | "password";

type Props = {
  isEditMode: boolean;
  isPasswordMode: boolean;
  passwordStep: PasswordStep;
  passwordLoading: boolean;
  passwordErrors: FieldErrors;
  otp: string;
  password: string;
  confirmPassword: string;
  timeLeft: number;
  onOpenPassword: () => void;
  onCancelPassword: () => void;
  onOtpChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onVerifyOtp: () => void;
  onPasswordSubmit: () => void;
  onResendOtp: () => void;
};

export default function SecurityCard({
  isEditMode,
  isPasswordMode,
  passwordStep,
  passwordLoading,
  passwordErrors,
  otp,
  password,
  confirmPassword,
  timeLeft,
  onOpenPassword,
  onCancelPassword,
  onOtpChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onVerifyOtp,
  onPasswordSubmit,
  onResendOtp,
}: Props) {
  return (
    <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Security</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Update password with OTP verification
          </p>
        </div>

        {!isEditMode && !isPasswordMode && (
          <button
            type="button"
            onClick={onOpenPassword}
            disabled={passwordLoading}
            className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {passwordLoading ? "Loading..." : "Change Password"}
          </button>
        )}
      </div>

      {isPasswordMode && (
        <div className="space-y-4">
          {passwordStep === "otp" && (
            <>
              <div className="max-w-md">
                <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Verify OTP
                </label>
                <input
                  value={otp}
                  maxLength={6}
                  onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ""))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                  placeholder="Enter OTP"
                />
                {passwordErrors.otp && (
                  <p className="mt-1 text-sm text-red-500">{passwordErrors.otp}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                {timeLeft > 0 ? (
                  <p className="text-slate-500 dark:text-slate-400">
                    Resend OTP in{" "}
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {timeLeft}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={onResendOtp}
                    className="font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onCancelPassword}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onVerifyOtp}
                  disabled={passwordLoading}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-sky-600 dark:hover:bg-sky-700"
                >
                  {passwordLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </>
          )}

          {passwordStep === "password" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                    placeholder="Enter new password"
                  />
                  {passwordErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{passwordErrors.password}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                    placeholder="Confirm password"
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {passwordErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Minimum 6 characters, one uppercase, one lowercase, one number, and one special character.
              </p>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onCancelPassword}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onPasswordSubmit}
                  disabled={passwordLoading}
                  className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}