import { ArrowDownRight, ArrowUpRight, Clock, Coins, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SummaryStats() {
  const stats = [
    {
      title: "CO2 Saved",
      value: "124.5 tons",
      icon: Leaf,
      change: "+12.3%",
      changeType: "positive",
      subtitle: "vs last month",
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      title: "Time Saved",
      value: "348 hours",
      icon: Clock,
      change: "+8.7%",
      changeType: "positive",
      subtitle: "vs last month",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Cost Efficiency",
      value: "$24,580",
      icon: Coins,
      change: "-3.1%",
      changeType: "negative",
      subtitle: "vs last month",
      iconColor: "text-amber-500", 
      iconBg: "bg-amber-100",
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden border-none shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={cn("p-2 rounded-full", stat.iconBg)}>
                <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center mt-1">
              <span
                className={cn(
                  "text-xs font-medium flex items-center",
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                )}
              >
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </span>
              <span className="text-xs text-gray-500 ml-1">{stat.subtitle}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
