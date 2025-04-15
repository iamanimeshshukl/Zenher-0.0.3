
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CycleModeSelectorProps {
  defaultMode?: string;
  className?: string;
  onChange?: (mode: string) => void;
}

export function CycleModeSelector({
  defaultMode = "Period Tracking",
  className,
  onChange,
}: CycleModeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(defaultMode);

  const modes = [
    "Period Tracking",
    "Trying to Conceive",
    "Birth Control",
    "Pregnancy"
  ];

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    setIsOpen(false);
    if (onChange) onChange(mode);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center space-x-2 rounded-full bg-rhythm-light text-rhythm-dark px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rhythm-primary"
      >
        <span>Mode: {selectedMode}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="absolute mt-1 w-full z-10 bg-white rounded-md shadow-lg">
          {modes.map((mode) => (
            <div
              key={mode}
              className={cn(
                "px-4 py-2 text-sm cursor-pointer hover:bg-rhythm-light transition-colors",
                selectedMode === mode && "bg-rhythm-light text-rhythm-primary"
              )}
              onClick={() => handleModeChange(mode)}
            >
              {mode}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
