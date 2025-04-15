
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RhythmHeaderProps {
  title: string;
  showProfile?: boolean;
}

export function RhythmHeader({ title, showProfile = true }: RhythmHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
        
        </div>
        <h1 className="text-lg font-medium text-center flex-1">{title}</h1>
        <div className="flex-1 flex justify-end">
          {showProfile && (
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full overflow-hidden"
              >
                
                <span className="sr-only">Profile</span>
                <div className="w-8 h-8 rounded-full bg-pink-500 "></div>
                
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
