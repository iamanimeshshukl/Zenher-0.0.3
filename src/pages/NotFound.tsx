
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RhythmHeader } from "@/components/rhythm-header";
import { RhythmNav } from "@/components/rhythm-nav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <RhythmHeader title="Page Not Found" />
      
      <main className="container flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-rhythm-light flex items-center justify-center mb-6">
          <span className="text-4xl">🤔</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Oops!</h1>
        <p className="text-gray-600 mb-8">We couldn't find the page you're looking for.</p>
        
        <Link to="/">
          <Button className="bg-rhythm-primary hover:bg-rhythm-dark">
            Return to Home
          </Button>
        </Link>
      </main>
      
      <RhythmNav />
    </div>
  );
};

export default NotFound;
