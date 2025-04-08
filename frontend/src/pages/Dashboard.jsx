import { ReactNode } from "react";
import { Bell, Calendar, Menu, PieChart, Settings, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import {DateRangeFilter} from '../components/ui/DateRangeFilter'
import {TransportModeFilter} from '../components/ui/TransportModeFilter'
import {SummaryStats} from '../components/ui/SummaryStats'
import {ShipmentOverview} from '../components/ui/ShipmentOverview'
import {ShipmentMap} from '../components/ui/ShipmentMap'
import {EmissionsChart} from '../components/ui/EmissionsChart'
export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const sidebarItems = [
    { name: "Dashboard", icon: PieChart, active: true },
    { name: "Shipments", icon: Truck, active: false },
    { name: "Schedule", icon: Calendar, active: false },
    { name: "Settings", icon: Settings, active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="flex flex-1">
        {/* Sidebar */}
       

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Overlay for mobile sidebar */}
          {sidebarOpen && isMobile && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden" 
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Transit Insight Dashboard</h1>
        
        <div className="space-y-3">
          <DateRangeFilter />
          <TransportModeFilter />
        </div>
        
        <SummaryStats />
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ShipmentOverview />
          </div>
          <div className="lg:col-span-2">
            <ShipmentMap />
          </div>
        </div>
        
        <EmissionsChart />
      </div>
        </main>
      </div>
    </div>
  );
}
