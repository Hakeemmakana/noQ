import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";

// ── Constants ────────────────────────────────────────────────────────────────

const OTP_LENGTH = 6;
const TIMER_SECONDS = 45;
const MASKED_EMAIL = "j***@example.com";

// ── Types ────────────────────────────────────────────────────────────────────

type OtpDigits = string[]; // array of 6 single-char strings

// ── Icons ────────────────────────────────────────────────────────────────────

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V6l-9-4z"
        fill="#2563EB"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#2563EB" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l4 8-4 12-4-12 4-8z" />
      <path d="M2 10h20L12 22 2 10z" opacity="0.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-gray-400" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  );
}

// ── Timer Hook ───────────────────────────────────────────────────────────────

function useTimer(initial: number) {
  const [seconds, setSeconds] = useState<number>(initial);
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    if (!active || seconds <= 0) { setActive(false); return; }
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [active, seconds]);

  const reset = useCallback(() => {
    setSeconds(initial);
    setActive(true);
  }, [initial]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return { mm, ss, expired: seconds <= 0, reset };
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function TwoStepVerification() {
  const [otp, setOtp] = useState<OtpDigits>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(OTP_LENGTH).fill(null));
  const { mm, ss, expired, reset } = useTimer(TIMER_SECONDS);

  // Focus first input on mount
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  const focusAt = (index: number) => {
    inputRefs.current[Math.max(0, Math.min(OTP_LENGTH - 1, index))]?.focus();
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = val;
    setOtp(next);
    setError("");
    if (val && index < OTP_LENGTH - 1) focusAt(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
      } else {
        focusAt(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusAt(index - 1);
    } else if (e.key === "ArrowRight") {
      focusAt(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    focusAt(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const handleVerify = (): void => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) { setError("Please enter all 6 digits."); return; }
    if (expired) { setError("Your code has expired. Please resend."); return; }
    // Simulate: accept "123456" as valid
    if (code === "123456") { setVerified(true); return; }
    setError("Invalid code. Please try again.");
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimeout(() => focusAt(0), 50);
  };

  const handleResend = (): void => {
    if (!expired) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    reset();
    setTimeout(() => focusAt(0), 50);
  };

  const filledCount = otp.filter(Boolean).length;

  // ── Success Screen ─────────────────────────────────────────────────────────

  if (verified) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-950" : "bg-[#f0f2f5]"}`}>
        <div className={`rounded-3xl shadow-xl p-12 flex flex-col items-center max-w-sm text-center ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-5">✅</div>
          <h2 className="text-2xl font-bold mb-2">Verified!</h2>
          <p className={`text-sm mb-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Your identity has been confirmed successfully.
          </p>
          <button
            onClick={() => { setVerified(false); setOtp(Array(OTP_LENGTH).fill("")); reset(); }}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // ── Main Render ────────────────────────────────────────────────────────────

  const dm = darkMode;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dm ? "bg-gray-950" : "bg-[#f0f2f5]"}`}>

      {/* NAV */}
      <nav className={`flex items-center justify-between px-8 h-16 border-b ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
        <div className="flex items-center gap-2">
          <DiamondIcon />
          <span className={`font-bold text-lg tracking-tight ${dm ? "text-white" : "text-gray-900"}`}>NoQ</span>
        </div>
        <button
          onClick={() => setDarkMode((d) => !d)}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${dm ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <MoonIcon />
        </button>
      </nav>

      {/* CARD */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
        <div className={`w-full max-w-md rounded-3xl shadow-lg shadow-black/5 p-8 md:p-10 transition-colors duration-300 ${dm ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"}`}>

          {/* Back */}
          <Link  to='/login' className={`flex items-center gap-1.5 text-sm mb-7 transition-colors ${dm ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Login
          </Link>

          {/* Shield Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <ShieldIcon />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className={`text-2xl font-bold mb-2 ${dm ? "text-white" : "text-gray-900"}`}>
              Two-Step Verification
            </h1>
            <p className={`text-sm leading-relaxed ${dm ? "text-gray-400" : "text-gray-500"}`}>
              We've sent a 6-digit code to your registered email address
            </p>
            <p className={`text-sm font-semibold mt-1 ${dm ? "text-gray-200" : "text-gray-800"}`}>
              {MASKED_EMAIL}
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2.5 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.target.select()}
                className={`
                  w-11 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none
                  transition-all duration-200 caret-blue-500
                  ${dm
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                  }
                  ${digit
                    ? "border-blue-500 shadow-sm shadow-blue-100"
                    : error
                    ? "border-red-400"
                    : dm
                    ? "border-gray-700 focus:border-blue-500"
                    : "border-gray-200 focus:border-blue-500 focus:shadow-sm focus:shadow-blue-100"
                  }
                `}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-red-500 text-sm mb-4 font-medium">{error}</p>
          )}

          {/* Timer */}
          <div className={`rounded-2xl p-4 mb-4 ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
            <div className="flex items-end justify-center gap-3">
              <div className="text-center">
                <p className={`text-3xl font-bold tabular-nums leading-none ${expired ? "text-red-500" : dm ? "text-white" : "text-gray-900"}`}>
                  {mm}
                </p>
                <p className={`text-[10px] font-semibold tracking-widest uppercase mt-1 ${dm ? "text-gray-500" : "text-gray-400"}`}>MIN</p>
              </div>
              <p className={`text-2xl font-bold mb-4 ${dm ? "text-gray-500" : "text-gray-400"}`}>:</p>
              <div className="text-center">
                <p className={`text-3xl font-bold tabular-nums leading-none ${expired ? "text-red-500" : dm ? "text-white" : "text-gray-900"}`}>
                  {ss}
                </p>
                <p className={`text-[10px] font-semibold tracking-widest uppercase mt-1 ${dm ? "text-gray-500" : "text-gray-400"}`}>SEC</p>
              </div>
            </div>
          </div>

          {/* Resend */}
          <p className={`text-center text-sm mb-6 ${dm ? "text-gray-400" : "text-gray-500"}`}>
            Didn't receive a code?{" "}
            <button
              onClick={handleResend}
              disabled={!expired}
              className={`font-semibold transition-colors ${
                expired
                  ? "text-blue-500 hover:text-blue-700 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend OTP
            </button>
          </p>

          {/* Progress bar */}
          <div className={`h-1 rounded-full mb-6 overflow-hidden ${dm ? "bg-gray-800" : "bg-gray-100"}`}>
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(filledCount / OTP_LENGTH) * 100}%` }}
            />
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={filledCount < OTP_LENGTH}
            className={`
              w-full py-4 rounded-2xl font-bold text-base text-white tracking-wide transition-all duration-200
              ${filledCount === OTP_LENGTH
                ? "bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-md shadow-blue-200"
                : "bg-blue-300 cursor-not-allowed"
              }
            `}
          >
            Verify & Continue
          </button>

          {/* Different method */}
          <button className={`w-full text-center text-sm mt-4 font-medium transition-colors ${dm ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}`}>
            Use a different method
          </button>

          {/* Divider */}
          <div className={`border-t mt-7 pt-5 flex items-center justify-center gap-2 ${dm ? "border-gray-800" : "border-gray-100"}`}>
            <LockIcon />
            <p className={`text-xs ${dm ? "text-gray-600" : "text-gray-400"}`}>
              Secure verification for your protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}