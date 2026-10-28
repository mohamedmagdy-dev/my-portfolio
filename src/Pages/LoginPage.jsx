import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { loginAdmin, onAuthChange } from "../firebase/services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect straight to dashboard
  useEffect(() => {
    document.title = "Admin Login | Mohamed Magdy";
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await loginAdmin(email, password);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      let message = "Invalid email or password.";
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
        message = "Incorrect email or password. Please verify your admin credentials.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please try again later.";
      } else if (err.code === "auth/network-request-failed") {
        message = "Network error. Please check your internet connection.";
      } else if (err.message) {
        message = err.message;
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-cream font-main flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-dark-surface border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-cream tracking-tight">Admin Access</h1>
          <p className="text-muted text-xs mt-1.5">
            Sign in to manage projects and portfolio content
          </p>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start justify-between gap-2">
            <span>{errorMsg}</span>
            <button
              type="button"
              onClick={() => setErrorMsg("")}
              className="text-red-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-charcoal border border-gray-700/80 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-accent transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-charcoal border border-gray-700/80 rounded-xl pl-4 pr-11 py-3 text-cream text-sm focus:outline-none focus:border-accent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-cream text-xs px-1 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-accent text-charcoal font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition shadow-lg shadow-accent/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <Link
            to="/"
            className="text-xs text-muted hover:text-cream transition inline-flex items-center gap-1.5"
          >
            <span>←</span> Back to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
