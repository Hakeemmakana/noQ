import React,{useState} from 'react'

const SuperAdminLogin = () => {
    console.log('sksdfk')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("••••••••");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "radial-gradient(ellipse at 50% 35%, #0e1d33 0%, #090f1c 55%, #060b14 100%)",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo + Title above card */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
        {/* Blue shield icon box */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "18px",
            background: "linear-gradient(145deg, #4a9af5 0%, #2563eb 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
            boxShadow: "0 8px 30px rgba(59,130,246,0.4)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L3 6.5V12c0 5.25 3.75 10.15 9 11.5 5.25-1.35 9-6.25 9-11.5V6.5L12 2z"
              fill="rgba(255,255,255,0.15)"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 7v5M12 15v.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="8.5" r="1.2" fill="white" />
          </svg>
        </div>

        <h1 style={{ color: "white", fontSize: "18px", fontWeight: "700", letterSpacing: "0.04em", margin: 0 }}>
          Super Admin Control Center
        </h1>
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(13, 24, 44, 0.9)",
          borderRadius: "20px",
          border: "1px solid rgba(59,130,246,0.2)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}
      >
        {/* Card body */}
        <div style={{ padding: "40px 40px 32px" }}>
          {/* Heading */}
          <h2
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "800",
              textAlign: "center",
              lineHeight: 1.3,
              margin: "0 0 12px",
            }}
          >
            Super Admin Secure<br />Authentication
          </h2>

          <p
            style={{
              color: "rgba(148,174,215,0.65)",
              fontSize: "14px",
              textAlign: "center",
              lineHeight: 1.65,
              margin: "0 0 32px",
            }}
          >
            Elevated privileges required. Access is restricted to Tier-1<br />
            system administrators only.
          </p>

          {/* Email Field */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                color: "rgba(160,190,230,0.8)",
                fontSize: "13.5px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Super Admin Email / Username
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="superadmin@company.com"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                background: "rgba(8, 16, 32, 0.7)",
                border: "1px solid rgba(59,130,246,0.2)",
                color: "rgba(200,220,255,0.9)",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(59,130,246,0.55)";
                e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(59,130,246,0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "28px" }}>
            <label
              style={{
                display: "block",
                color: "rgba(160,190,230,0.8)",
                fontSize: "13.5px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Security Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "14px 48px 14px 16px",
                  borderRadius: "12px",
                  background: "rgba(8, 16, 32, 0.7)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  color: "rgba(200,220,255,0.9)",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  letterSpacing: showPass ? "normal" : "0.12em",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59,130,246,0.55)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(59,130,246,0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(100,145,210,0.55)",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(120,170,255,0.9)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(100,145,210,0.55)")}
              >
                {showPass ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              border: "none",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "0.03em",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: "0 6px 24px rgba(59,130,246,0.45)",
              transition: "transform 0.15s, box-shadow 0.15s, opacity 0.15s",
              opacity: loading ? 0.75 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px rgba(59,130,246,0.55)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(59,130,246,0.45)";
            }}
          >
            {loading ? (
              <>
                <svg
                  style={{ animation: "spin 1s linear infinite", width: 18, height: 18 }}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Authenticating...
              </>
            ) : (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.3}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Super Admin Login
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(59,130,246,0.1)", margin: "0 24px" }} />

        {/* Bottom section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            padding: "24px 40px 28px",
          }}
        >
          {/* Encrypted Connection badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.22)",
            }}
          >
            {/* Pulsing green dot */}
            <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#22c55e",
                  opacity: 0.7,
                  animation: "ping 1.2s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
            </span>

            <svg width="14" height="14" fill="none" stroke="#4ade80" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>

            <span style={{ color: "#4ade80", fontSize: "12.5px", fontWeight: "600" }}>
              Encrypted Connection Active
            </span>
          </div>

          {/* Protocol label */}
          <p
            style={{
              color: "rgba(59,130,246,0.28)",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Level 5 Root Access Protocol
          </p>
        </div>
      </div>

      {/* Footer */}
      <p
        style={{
          color: "rgba(100,130,175,0.38)",
          fontSize: "12.5px",
          marginTop: "28px",
          letterSpacing: "0.02em",
        }}
      >
        © 2024 Global Talent Solutions • Super Admin Interface
      </p>

      {/* Keyframe styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        input::placeholder { color: rgba(80,110,160,0.45); }
      `}</style>
    </div>
  );
}

export default SuperAdminLogin
// import { useState } from "react";

// export default function SuperAdminLogin() 