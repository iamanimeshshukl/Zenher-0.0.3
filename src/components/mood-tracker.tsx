
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface MoodTrackerProps {
  className?: string;
  onClick?: () => void;
}

export function MoodTracker({ className, onClick }: MoodTrackerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between bg-orange-50 text-orange-900 rounded-full p-4 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="bg-orange-400 rounded-full p-2 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <span className="font-medium">How do you feel today?</span>
      </div>
      <ChevronRight className="h-5 w-5 text-orange-400" />
    </div>
  );
}
