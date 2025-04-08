import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from "recharts";

// Mock data for emissions by transport mode
const emissionsByMode = [
  {
    name: "Jan",
    Road: 40,
    Rail: 24,
    Sea: 35,
    Air: 65,
  },
  {
    name: "Feb",
    Road: 30,
    Rail: 25,
    Sea: 30,
    Air: 55,
  },
  {
    name: "Mar",
    Road: 35,
    Rail: 30,
    Sea: 25,
    Air: 60,
  },
  {
    name: "Apr",
    Road: 25,
    Rail: 35,
    Sea: 20,
    Air: 50,
  },
  {
    name: "May",
    Road: 20,
    Rail: 40,
    Sea: 15,
    Air: 45,
  },
  {
    name: "Jun",
    Road: 15,
    Rail: 45,
    Sea: 10,
    Air: 40,
  },
];

// Mock data for emissions saved over time
const emissionsSaved = [
  { name: "Jan", Traditional: 100, Optimized: 70 },
  { name: "Feb", Traditional: 110, Optimized: 75 },
  { name: "Mar", Traditional: 115, Optimized: 78 },
  { name: "Apr", Traditional: 120, Optimized: 80 },
  { name: "May", Traditional: 130, Optimized: 85 },
  { name: "Jun", Traditional: 140, Optimized: 88 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
        <p className="font-medium text-sm">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} CO2 tons`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function EmissionsChart() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">CO2 Emissions by Transport Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={emissionsByMode}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Road" fill="#FFA726" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Rail" fill="#5E35B1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Sea" fill="#1E88E5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Air" fill="#EC407A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Emissions Saved vs Traditional Logistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={emissionsSaved}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="Traditional" 
                  stroke="#1A3A5F" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Optimized" 
                  stroke="#48B2A5" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
