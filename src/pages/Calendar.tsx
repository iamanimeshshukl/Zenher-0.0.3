
import { useState } from "react";
import { RhythmHeader } from "@/components/rhythm-header";
import { RhythmNav } from "@/components/rhythm-nav";
import { CalendarView } from "@/components/calendar-view";
import { addDays, format } from "date-fns";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock data - would come from API/database in real app
  const today = new Date();
  const periodDays = [
    addDays(today, -5),
    addDays(today, -4),
    addDays(today, -3),
    addDays(today, -2),
    addDays(today, -1),
    today,
    addDays(today, 19),
    addDays(today, 20),
    addDays(today, 21),
    addDays(today, 22),
    addDays(today, 23),
  ];
  
  const fertileDays = [
    addDays(today, 10),
    addDays(today, 11),
    addDays(today, 12),
    addDays(today, 13),
    addDays(today, 15),
    addDays(today, 16),
  ];
  
  const ovulationDay = addDays(today, 14);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RhythmHeader title="Calendar" />
      
      <main className="container px-4 pt-6 pb-20">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <CalendarView 
            periodDays={periodDays}
            fertileDays={fertileDays}
            ovulationDay={ovulationDay}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium mb-3">
            {format(selectedDate, "MMMM d, yyyy")}
          </h2>
          
          <div className="space-y-4">
            {isDateInArray(selectedDate, periodDays) && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-phase-period mr-2"></div>
                <span>Period day</span>
              </div>
            )}
            
            {isDateEqual(selectedDate, ovulationDay) && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-phase-ovulation mr-2"></div>
                <span>Ovulation day</span>
              </div>
            )}
            
            {isDateInArray(selectedDate, fertileDays) && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-phase-fertile mr-2"></div>
                <span>Fertile window</span>
              </div>
            )}
            
            {!isDateInArray(selectedDate, periodDays) && 
              !isDateEqual(selectedDate, ovulationDay) && 
              !isDateInArray(selectedDate, fertileDays) && (
                <div className="text-gray-500">No events scheduled</div>
              )}
          </div>
        </div>
      </main>
      
      <RhythmNav />
    </div>
  );
};

// Helper functions to compare dates
function isDateEqual(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

function isDateInArray(date: Date, dateArray: Date[]): boolean {
  return dateArray.some(d => isDateEqual(date, d));
}

export default Calendar;
