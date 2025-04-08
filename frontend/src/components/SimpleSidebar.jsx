import React from 'react';
import {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Menu,
  X,
  User
} from 'lucide-react';

export function SimpleSidebar({ onViewChange }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
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

  return (
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
  );
} 