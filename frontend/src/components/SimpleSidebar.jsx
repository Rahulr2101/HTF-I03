import React from 'react';
import {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Menu,
  X,
  User,
  Zap,
  Clock,
  Coins,
  Leaf
} from 'lucide-react';

export function SimpleSidebar({ onViewChange, showLocationCards }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState('Models');

  const navItems = [
    {
      title: 'Playground',
      icon: SquareTerminal,
    },
    {
      title: 'Models',
      icon: Bot,
    },
    {
      title: 'Documentation',
      icon: BookOpen,
    },
    {
      title: 'Settings',
      icon: Settings2,
    },
  ];

  const handleItemClick = (title) => {
    setSelectedItem(title);
    if (onViewChange) {
      onViewChange(title);
    }
  };

  const cards = [
    {
      title: 'Efficiency',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Optimum cost',
      icon: Coins,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Optimum time',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Minimal Emissions',
      icon: Leaf,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    }
  ];

  return (
    <div className="flex h-full">
      {/* Main sidebar */}
      <div 
        className={`h-full bg-white border-r transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!isCollapsed && <h1 className="text-xl font-bold">ShipWell</h1>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <div className="p-3">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.title}
                className={`flex items-center w-full p-2 rounded-md transition-colors ${
                  selectedItem === item.title 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleItemClick(item.title)}
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <span className="ml-3">{item.title}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Section */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-2">
              <User size={isCollapsed ? 16 : 20} />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <div className="font-medium">User</div>
                <div className="text-xs text-gray-500">user@example.com</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cards Section - appears when showLocationCards is true */}
      {showLocationCards && (
        <div className="w-64 p-4 bg-white border-r h-full overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Location Metrics</h2>
          <div className="grid grid-cols-1 gap-4">
            {cards.map((card, index) => (
              <div 
                key={index}
                className={`${card.bgColor} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center">
                  <card.icon className={`${card.color} mr-3`} size={24} />
                  <h3 className="font-medium">{card.title}</h3>
                </div>
                {/* Add your metric value here when available */}
                <div className="mt-2 text-2xl font-bold">--</div>
                <div className="text-xs text-gray-500 mt-1">No data available</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}