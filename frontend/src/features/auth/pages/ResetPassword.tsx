import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { resetPassword } from '../service/authService';
import { successToast, errorToast } from '../../../shared/utils/toastNotification';
import { resetPassword } from '../service/authService';
import type { ApiError } from '../../../utils/typs';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string>('');

  // Get token from previous page (verify-otp)
  useEffect(() => {
    const state = location.state as { token?: string; email?: string } | null;

    if (state?.token) {
      setToken(state.token);
    } else {
      // Fallback: If no token, redirect back
      navigate('/auth/login', { replace: true });
    }
  }, [location.state, navigate]);

  const validatePassword = (password: string): string => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Session expired. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword({
        token,
        newPassword
      });

      successToast(res.message || "Password reset successfully!");

      // Redirect to login after success
      setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 1500);

    } catch (err: unknown) {
      if (typeof err == 'object' && err !== null && 'response' in err) {

        const message = (err as ApiError)?.response?.data?.message || "Failed to reset password";
        setError(message);
        errorToast(message);
      } else if (err instanceof Error) {
        const message = err?.message
        setError(message);
        errorToast(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">
            Create a new strong password for your account
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/60 border border-white/80 p-8">
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            {/* New Password */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none text-sm pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none text-sm pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-sm tracking-wide disabled:opacity-70 transition-all mb-4"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        </div>

        {/* Password Requirements */}
        <div className="mt-6 text-xs text-gray-500 text-center space-y-1">
          <p>Password must contain:</p>
          <p>• At least 8 characters</p>
          <p>• One uppercase letter, one lowercase letter, and one number</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;