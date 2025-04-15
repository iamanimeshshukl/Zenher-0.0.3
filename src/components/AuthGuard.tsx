
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, termsAccepted } = useAuth();
  const location = useLocation();

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rhythm-primary"></div>
      </div>
    );
  }

  // If not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If logged in but hasn't accepted terms, redirect to terms page
  // Skip this redirect if already on terms page
  if (!termsAccepted && location.pathname !== "/terms") {
    return <Navigate to="/terms" state={{ from: location }} replace />;
  }

  // If authenticated and terms accepted, render the protected content
  return <>{children}</>;
};
