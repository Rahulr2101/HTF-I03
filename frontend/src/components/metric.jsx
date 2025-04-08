import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Coins, Clock, Leaf } from 'lucide-react';
import { Card } from "@/components/ui/card";

const metricsCardsData = [
  {
    title: 'Route Efficiency',
    icon: Zap,
    value: '92%',
    description: 'Optimal route efficiency',
    subtext: 'Based on historical data'
  },
  {
    title: 'Estimated Cost',
    icon: Coins,
    value: '$4,850',
    description: 'Total shipping cost',
    subtext: 'Including all fees and taxes'
  },
  {
    title: 'Transit Duration',
    icon: Clock,
    value: '18 days',
    description: 'Estimated delivery time',
    subtext: 'Port to port transit'
  },
  {
    title: 'Carbon Footprint',
    icon: Leaf,
    value: '2.4t CO₂',
    description: 'Estimated emissions',
    subtext: 'Based on selected route'
  }
];

const MetricCards = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    // setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`absolute top-14 right-3/4 transform -translate-x-1/2 z-10 space-y-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100 z-20"
        >
          ✕
        </Button>
      </div>

      {metricsCardsData.map((card, index) => (
        <Card
          key={index}
          onClick={handleClose}
          className="relative bg-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <card.icon className="text-gray-500" size={18} />
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-800">{card.value}</span>
                  <span className="text-sm text-gray-500">{card.description}</span>
                </div>
                <p className="text-xs text-gray-400">{card.subtext}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricCards;