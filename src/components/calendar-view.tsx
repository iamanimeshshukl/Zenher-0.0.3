
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  onSelectDate?: (date: Date) => void;
  periodDays?: Date[];
  fertileDays?: Date[];
  ovulationDay?: Date;
  selectedDate?: Date;
  className?: string;
}

export function CalendarView({
  onSelectDate,
  periodDays = [],
  fertileDays = [],
  ovulationDay,
  selectedDate = new Date(),
  className,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const isPeriod = (date: Date) => {
    return periodDays.some(d => 
      d.getDate() === date.getDate() && 
      d.getMonth() === date.getMonth() && 
      d.getFullYear() === date.getFullYear()
    );
  };

  const isFertile = (date: Date) => {
    return fertileDays.some(d => 
      d.getDate() === date.getDate() && 
      d.getMonth() === date.getMonth() && 
      d.getFullYear() === date.getFullYear()
    );
  };

  const isOvulation = (date: Date) => {
    return ovulationDay && 
      date.getDate() === ovulationDay.getDate() && 
      date.getMonth() === ovulationDay.getMonth() && 
      date.getFullYear() === ovulationDay.getFullYear();
  };

  const isSelected = (date: Date) => {
    return selectedDate && 
      date.getDate() === selectedDate.getDate() && 
      date.getMonth() === selectedDate.getMonth() && 
      date.getFullYear() === selectedDate.getFullYear();
  };

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const getDayClass = (date: Date) => {
    if (isSelected(date)) {
      return "border-2 border-rhythm-primary";
    }
    if (isToday(date)) {
      return "border border-rhythm-primary";
    }
    if (isPeriod(date)) {
      return "bg-phase-period text-white";
    }
    if (isOvulation(date)) {
      return "bg-phase-ovulation text-white";
    }
    if (isFertile(date)) {
      return "bg-phase-fertile";
    }
    return "";
  };

  return (
    <div className={cn("", className)}>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} className="p-2">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days header */}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {/* Empty cells before start of month */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-start-${i}`} className="h-10" />
        ))}

        {/* Days of the month */}
        {monthDays.map((day) => (
          <div
            key={day.toString()}
            onClick={() => onSelectDate && onSelectDate(day)}
            className={cn(
              "h-10 flex items-center justify-center rounded-md text-sm cursor-pointer",
              !isSameMonth(day, currentMonth) && "text-gray-300",
              getDayClass(day)
            )}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}
