
import { cn } from "@/lib/utils";
import { useState } from "react";

interface InfoBannerProps {
  title: string;
  subtitle: string;
  hideText?: string;
  learnMoreText?: string;
  learnMoreLink?: string;
  className?: string;
  color?: "blue" | "pink" | "teal";
}

export function InfoBanner({
  title,
  subtitle,
  hideText = "Hide this banner",
  learnMoreText = "Learn more",
  learnMoreLink = "#",
  color = "blue",
  className,
}: InfoBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const colorClasses = {
    blue: "bg-blue-500 text-white",
    pink: "bg-phase-period text-white",
    teal: "bg-rhythm-primary text-white",
  };

  return (
    <div 
      className={cn(
        "p-4 md:p-6 text-center",
        colorClasses[color],
        className
      )}
    >
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm mb-4 opacity-90">{subtitle}</p>
      <div className="flex justify-center space-x-4 text-sm">
        <button
          onClick={() => setVisible(false)}
          className="underline opacity-90"
        >
          {hideText}
        </button>
        <a
          href={learnMoreLink}
          className="px-4 py-2 bg-white bg-opacity-20 rounded-full"
        >
          {learnMoreText}
        </a>
      </div>
    </div>
  );
}
