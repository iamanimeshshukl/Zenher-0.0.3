import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface CycleCircleProps {
  currentDay: number;
  cycleLength: number;
  periodLength: number;
  periodStartDate: Date;
  late?: number;
  className?: string;
}

export function CycleCircle({
  currentDay,
  cycleLength,
  periodLength,
  periodStartDate,
  late = 0,
  className,
}: CycleCircleProps) {
  const [rotation, setRotation] = useState(0);

  // Normalize currentDay to stay within cycleLength
  const normalizedDay = Math.max(1, Math.min(currentDay, cycleLength));

  // Calculate the current phase
  const getPhase = () => {
    if (late > 0) return "late";
    if (normalizedDay <= periodLength) return "period";
    if (normalizedDay >= cycleLength - 14 && normalizedDay <= cycleLength - 11) return "ovulation";
    if (normalizedDay > periodLength && normalizedDay < cycleLength - 14) return "follicular";
    return "luteal";
  };

  // Define phase colors (pink and purple palette)
  const getPhaseColor = () => {
    const phase = getPhase();
    switch (phase) {
      case "period":
        return "from-pink-400 to-pink-600";
      case "late":
        return "from-pink-500 to-pink-700";
      case "ovulation":
        return "from-purple-400 to-purple-600";
      case "follicular":
        return "from-pink-300 to-purple-300";
      case "luteal":
        return "from-purple-300 to-pink-400";
      default:
        return "from-gray-200 to-gray-200";
    }
  };

  // Calculate rotation for the progress indicator
  useEffect(() => {
    const deg = (normalizedDay / cycleLength) * 360;
    setRotation(deg);
  }, [normalizedDay, cycleLength]);

  // Get phase message
  const getMessage = () => {
    const phase = getPhase();
    if (phase === "late") {
      return {
        title: `Period ${late} Days Late`,
        subtitle: "Monitor symptoms",
      };
    }
    if (phase === "period") {
      return {
        title: "Period",
        subtitle: `Day ${normalizedDay}`,
      };
    }
    if (phase === "ovulation") {
      return {
        title: "Ovulation",
        subtitle: "Peak fertility",
      };
    }
    if (phase === "follicular") {
      return {
        title: "Follicular",
        subtitle: `${cycleLength - 14 - normalizedDay} days to ovulation`,
      };
    }
    return {
      title: "Luteal",
      subtitle: `${cycleLength - normalizedDay} days to period`,
      };
  };

  const message = getMessage();

  // Calculate arc path for the progress circle
  const calculateArcPath = (percentage: number) => {
    const radius = 130; // Slightly smaller for better proportions
    const center = 150;
    const startAngle = 0; // Start at 12 o'clock
    const endAngle = percentage * 360;

    const start = {
      x: center + radius * Math.cos((startAngle * Math.PI) / 180),
      y: center + radius * Math.sin((startAngle * Math.PI) / 180),
    };
    const end = {
      x: center + radius * Math.cos((endAngle * Math.PI) / 180),
      y: center + radius * Math.sin((endAngle * Math.PI) / 180),
    };

    const largeArcFlag = percentage > 0.5 ? 1 : 0;

    return [
      `M ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    ].join(" ");
  };

  return (
    <div className={cn("relative w-full max-w-[320px] mx-auto py-8", className)}>
      {/* SVG Circle */}
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="w-full h-full rotate-[-90deg]" // Rotate to start at top
      >
        {/* Background circle */}
        <circle
          cx="150"
          cy="150"
          r="130"
          fill="none"
          stroke="#f1f5f9" // Soft gray for background
          strokeWidth="14"
        />

        {/* Progress arc */}
        <path
          d={calculateArcPath(normalizedDay / cycleLength)}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className={getPhaseColor().split(" ")[0]} />
            <stop offset="100%" className={getPhaseColor().split(" ")[1]} />
          </linearGradient>
        </defs>

        {/* Current day marker */}
        <circle
          cx={150 + 130 * Math.cos((rotation * Math.PI) / 180)}
          cy={150 + 130 * Math.sin((rotation * Math.PI) / 180)}
          r="7"
          className={late > 0 ? "fill-pink-600" : "fill-purple-600"}
          filter="url(#shadow)"
        />

        {/* Shadow for marker */}
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2" />
          </filter>
        </defs>
      </svg>

      {/* Inner content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <p className="text-xs font-medium text-gray-500 mb-2">
          {format(new Date(), "MMM d, yyyy")}
        </p>
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          {message.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{message.subtitle}</p>
      </div>
    </div>
  );
}