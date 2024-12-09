import { Users, Shield, Layout } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles', icon: Shield },
  ];

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-4">
      <div className="flex items-center space-x-2 mb-8 px-4">
        <Shield className="h-8 w-8 text-indigo-500" />
        <span className="text-white text-xl font-bold">Admin Panel</span>
      </div>
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center space-x-2 px-4 py-3 rounded-lg mb-1',
                'transition-colors duration-200',
                activeTab === item.id
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}