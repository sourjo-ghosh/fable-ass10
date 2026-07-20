"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "reader",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const formValues = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formValues.entries());
      console.log("Submitting signup data:", payload);
      const { data, error } = await authClient.signUp.email({
        name: payload.fullName, // required
        email: payload.email, // required
        password: payload.confirmPassword, // required
        // image: "https://example.com/image.png",
        // callbackURL: "https://example.com/callback",
      });

      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     fullName: payload.fullName || formData.fullName,
      //     email: payload.email || formData.email,
      //     password: payload.password || formData.password,
      //     role: payload.role || formData.role,
      //   }),
      // });

      if (error) {
        throw new Error(error.message || "Registration failed");
      }
      router.push("/");
    } catch (err) {
      setErrors({ general: err.message || "Registration failed" });
    } finally {
      setIsSubmitting(false);
      console.log('success')
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0c0b0a",
        fontFamily: "var(--font-sans)",
        color: "#faf8f4",
      }}
    >
      {/* Left side: Dramatic Cinematic Image (Hidden on mobile) */}
      <div
        style={{
          position: "relative",
          flex: "1.2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          overflow: "hidden",
        }}
        className="auth-sidebar"
      >
        <Image
          src="/auth-bg.png"
          alt="Premium library background"
          fill
          priority
          sizes="50vw"
          style={{ objectFit: "cover" }}
        />
        {/* Dark golden gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(12,11,10,0.95) 0%, rgba(12,11,10,0.7) 50%, rgba(201,169,110,0.15) 100%)",
            zIndex: 1,
          }}
        />

        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            zIndex: 2,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg, #c9a96e, #e2c48a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(201,169,110,0.3)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0c0b0a"
              strokeWidth="2.5"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "#faf8f4",
            }}
          >
            Fable
          </span>
        </Link>

        {/* Dynamic quote */}
        <div style={{ zIndex: 2, position: "relative", maxWidth: "480px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#c9a96e",
              marginBottom: "16px",
            }}
          >
            Begin Your Chapter
          </span>
          <blockquote
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              lineHeight: "1.4",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#faf8f4",
              marginBottom: "24px",
            }}
          >
            "Books are a uniquely portable magic."
          </blockquote>
          <cite
            style={{
              fontSize: "0.85rem",
              color: "#a09880",
              fontStyle: "normal",
              fontWeight: 500,
            }}
          >
            — Stephen King
          </cite>
        </div>

        {/* Footer info */}
        <div
          style={{
            zIndex: 2,
            position: "relative",
            fontSize: "0.75rem",
            color: "#5a5548",
          }}
        >
          © {new Date().getFullYear()} Fable Bookstore. Every word counts.
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          background: "#0c0b0a",
          position: "relative",
          overflowY: "auto",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            zIndex: 2,
            padding: "20px 0",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.5rem",
                fontWeight: 400,
                color: "#faf8f4",
                lineHeight: "1.2",
                marginBottom: "8px",
              }}
            >
              Create account
            </h2>
            <p
              style={{ fontSize: "0.9rem", color: "#a09880", fontWeight: 300 }}
            >
              Join a community of readers and writers dedicated to literature.
            </p>
          </div>

          {/* Social signup button */}
          <button
            onClick={handleGoogleSignup}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "12px 24px",
              borderRadius: "99px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.02)",
              color: "#faf8f4",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201, 169, 110, 0.4)";
              e.currentTarget.style.background = "rgba(201, 169, 110, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div
            style={{
              position: "relative",
              margin: "28px 0",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "1px",
                background: "rgba(255,255,255,0.08)",
                zIndex: 1,
              }}
            />
            <span
              style={{
                position: "relative",
                zIndex: 2,
                background: "#0c0b0a",
                padding: "0 16px",
                fontSize: "0.75rem",
                color: "#5a5548",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Or register with email
            </span>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {errors.general && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "#f87171",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                }}
              >
                {errors.general}
              </div>
            )}

            {/* Full Name */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                htmlFor="fullName"
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#c9a96e",
                }}
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="John Doe"
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#faf8f4",
                  fontSize: "0.875rem",
                  outline: "none",
                  transition: "all 0.3s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(201, 169, 110, 0.4)";
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.03)";
                }}
              />
              {errors.fullName && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "0.75rem",
                    marginTop: "2px",
                  }}
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                htmlFor="email"
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#c9a96e",
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="name@example.com"
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#faf8f4",
                  fontSize: "0.875rem",
                  outline: "none",
                  transition: "all 0.3s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(201, 169, 110, 0.4)";
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.03)";
                }}
              />
              {errors.email && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "0.75rem",
                    marginTop: "2px",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#c9a96e",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    paddingRight: "70px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#faf8f4",
                    fontSize: "0.875rem",
                    outline: "none",
                    transition: "all 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(201, 169, 110, 0.4)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.05)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.03)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#c9a96e",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    padding: 0,
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "0.75rem",
                    marginTop: "2px",
                  }}
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                htmlFor="confirmPassword"
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#c9a96e",
                }}
              >
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    paddingRight: "70px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#faf8f4",
                    fontSize: "0.875rem",
                    outline: "none",
                    transition: "all 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(201, 169, 110, 0.4)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.05)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.03)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#c9a96e",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    padding: 0,
                  }}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "0.75rem",
                    marginTop: "2px",
                  }}
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <input type="hidden" name="role" value={formData.role} />

            {/* Role selector */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#c9a96e",
                }}
              >
                I want to join as
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "reader" })}
                  style={{
                    padding: "11px",
                    borderRadius: "12px",
                    border:
                      formData.role === "reader"
                        ? "1px solid #c9a96e"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                    background:
                      formData.role === "reader"
                        ? "rgba(201, 169, 110, 0.08)"
                        : "transparent",
                    color: formData.role === "reader" ? "#c9a96e" : "#a09880",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                >
                  Reader
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "writer" })}
                  style={{
                    padding: "11px",
                    borderRadius: "12px",
                    border:
                      formData.role === "writer"
                        ? "1px solid #c9a96e"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                    background:
                      formData.role === "writer"
                        ? "rgba(201, 169, 110, 0.08)"
                        : "transparent",
                    color: formData.role === "writer" ? "#c9a96e" : "#a09880",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                >
                  Writer
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: "12px",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Redirect link */}
          <p
            style={{
              marginTop: "24px",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#a09880",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#c9a96e",
                fontWeight: 600,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e2c48a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#c9a96e";
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .auth-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
