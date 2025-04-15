
import { useState } from "react";
import { format } from "date-fns";
import { RhythmHeader } from "@/components/rhythm-header";
import { RhythmNav } from "@/components/rhythm-nav";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Track = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [flowIntensity, setFlowIntensity] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const flowOptions = [
    { value: "spotting", label: "Spotting", color: "bg-pink-100" },
    { value: "light", label: "Light", color: "bg-pink-200" },
    { value: "medium", label: "Medium", color: "bg-pink-300" },
    { value: "heavy", label: "Heavy", color: "bg-pink-400" },
    { value: "very-heavy", label: "Very Heavy", color: "bg-pink-500" },
  ];

  const symptomOptions = [
    { value: "cramps", label: "Cramps" },
    { value: "headache", label: "Headache" },
    { value: "backache", label: "Backache" },
    { value: "nausea", label: "Nausea" },
    { value: "fatigue", label: "Fatigue" },
    { value: "bloating", label: "Bloating" },
    { value: "breast-tenderness", label: "Breast Tenderness" },
    { value: "mood-swings", label: "Mood Swings" },
    { value: "insomnia", label: "Insomnia" },
    { value: "acne", label: "Acne" },
    { value: "cravings", label: "Cravings" },
  ];

  const toggleSymptom = (value: string) => {
    if (symptoms.includes(value)) {
      setSymptoms(symptoms.filter(s => s !== value));
    } else {
      setSymptoms([...symptoms, value]);
    }
  };

  const handleSave = () => {
    // In a real app, this would save to Supabase
    console.log({
      date,
      flowIntensity,
      symptoms
    });
    
    // Show success message and redirect
    alert("Period data saved successfully!");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RhythmHeader title="Track period" />
      
      <main className="container px-4 pt-4 pb-24">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-medium mb-4">Select date</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => setDate(date!)}
            className="rounded-md border w-full pointer-events-auto"
          />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Tracking for: <strong>{format(date, "MMMM d, yyyy")}</strong>
          </p>
        </div>
        
        <Tabs defaultValue="flow" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="flow">Flow</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-medium mb-4">Period flow</h2>
              <div className="grid grid-cols-5 gap-2">
                {flowOptions.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-md border transition-all",
                      option.color,
                      flowIntensity === option.value
                        ? "ring-2 ring-rhythm-primary"
                        : "hover:ring-1 hover:ring-rhythm-primary"
                    )}
                    onClick={() => setFlowIntensity(option.value)}
                  >
                    <span className="block h-3 w-3 rounded-full bg-phase-period mb-1"></span>
                    <span className="text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="symptoms">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-medium mb-4">Symptoms</h2>
              <div className="grid grid-cols-3 gap-2">
                {symptomOptions.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "p-3 rounded-md border text-sm transition-all flex justify-center",
                      symptoms.includes(option.value)
                        ? "bg-rhythm-light ring-2 ring-rhythm-primary"
                        : "bg-white hover:bg-gray-50"
                    )}
                    onClick={() => toggleSymptom(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="fixed bottom-20 left-4 right-4 z-10">
          <Button 
            className="w-full bg-rhythm-primary hover:bg-rhythm-dark py-6"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </main>
      
      <RhythmNav />
    </div>
  );
};

export default Track;
