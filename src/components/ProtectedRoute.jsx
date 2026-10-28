import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { onAuthChange } from "../firebase/services/authService";

export default function ProtectedRoute({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center text-cream font-main">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted text-sm">Verifying admin session...</p>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to /login and preserve destination for seamless redirect after login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
