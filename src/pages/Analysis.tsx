
import { RhythmHeader } from "@/components/rhythm-header";
import { RhythmNav } from "@/components/rhythm-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const Analysis = () => {
  // Mock data for charts
  const cycleData = [
    { name: "Jan", length: 28 },
    { name: "Feb", length: 29 },
    { name: "Mar", length: 27 },
    { name: "Apr", length: 30 },
    { name: "May", length: 28 },
    { name: "Jun", length: 29 },
  ];

  const symptomData = [
    { name: "Cramps", count: 8 },
    { name: "Headache", count: 5 },
    { name: "Mood swings", count: 12 },
    { name: "Bloating", count: 9 },
    { name: "Fatigue", count: 14 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RhythmHeader title="Analysis" />
      
      <main className="container px-4 pt-6 pb-20">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cycle Length</CardTitle>
              <CardDescription>Your last 6 menstrual cycles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={cycleData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[20, 40]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="length"
                      stroke="#FF6B6B"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <div>
                  <p>Average: <strong>28.5 days</strong></p>
                </div>
                <div>
                  <p>Shortest: <strong>27 days</strong></p>
                </div>
                <div>
                  <p>Longest: <strong>30 days</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Symptoms</CardTitle>
              <CardDescription>Most frequently tracked symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={symptomData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8BD7D2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Predictions</CardTitle>
              <CardDescription>Based on your logged data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Next period</p>
                    <p className="font-semibold">May 12, 2025</p>
                  </div>
                  <Button variant="outline" size="sm">Add to calendar</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Next fertile window</p>
                    <p className="font-semibold">Apr 28 - May 3, 2025</p>
                  </div>
                  <Button variant="outline" size="sm">Add to calendar</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Next ovulation</p>
                    <p className="font-semibold">Apr 30, 2025</p>
                  </div>
                  <Button variant="outline" size="sm">Add to calendar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <RhythmNav />
    </div>
  );
};

export default Analysis;
