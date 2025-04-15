
import { useState } from "react";
import { RhythmHeader } from "@/components/rhythm-header";
import { RhythmNav } from "@/components/rhythm-nav";
import { CycleCircle } from "@/components/cycle-circle";
import { CycleModeSelector } from "@/components/cycle-mode-selector";
import { InfoBanner } from "@/components/info-banner";
import { MoodTracker } from "@/components/mood-tracker";
import { Link } from "react-router-dom";

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  
  // Mock data - in real app this would come from the database
  const cycleData = {
    currentDay: 41, // Days since last period started
    cycleLength: 28, // Average cycle length
    periodLength: 5, // Average period length
    periodStartDate: new Date(2025, 2, 5), // March 5, 2025
    late: 18, // Days late
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RhythmHeader title="Zenher" />
      
      {showBanner && (
        <InfoBanner 
          title="Trying to conceive?" 
          subtitle="We're here to help."
          hideText="Hide this banner"
          learnMoreText="Learn more"
          color="blue"
        />
      )}
      
      <main className="container px-4 pt-4 pb-20">
        <div className="flex justify-center mb-4">
          <CycleModeSelector />
        </div>
        
        <CycleCircle 
          currentDay={cycleData.currentDay}
          cycleLength={cycleData.cycleLength}
          periodLength={cycleData.periodLength}
          periodStartDate={cycleData.periodStartDate}
          late={cycleData.late}
        />
        
        <div className="mt-8">
          <MoodTracker />
        </div>
        
        <div className="mt-6">
          <h2 className="font-medium mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/track" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="font-medium">Log period</h3>
              <p className="text-xs text-gray-500 mt-1">Record flow, symptoms & more</p>
            </Link>
            <Link to="/calendar" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="font-medium">View calendar</h3>
              <p className="text-xs text-gray-500 mt-1">See upcoming cycle events</p>
            </Link>
            <Link to="/analysis" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="font-medium">Cycle insights</h3>
              <p className="text-xs text-gray-500 mt-1">Patterns & statistics</p>
            </Link>
            <Link to="/content" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="font-medium">Read articles</h3>
              <p className="text-xs text-gray-500 mt-1">Learn about your health</p>
            </Link>
          </div>
        </div>
      </main>
      
      <RhythmNav />
    </div>
  );
};

export default Index;
