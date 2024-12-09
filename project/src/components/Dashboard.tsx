import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Shield, UserCheck, UserX } from 'lucide-react';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { users, roles } = useStore();
  const activeUsers = users.filter((u) => u.status === 'active').length;
  const inactiveUsers = users.length - activeUsers;

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Inactive Users',
      value: inactiveUsers,
      icon: UserX,
      color: 'bg-red-500',
    },
    {
      title: 'Roles',
      value: roles.length,
      icon: Shield,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    'p-3 rounded-lg',
                    stat.color,
                    'bg-opacity-10'
                  )}
                >
                  <Icon
                    className={cn('h-6 w-6', stat.color.replace('bg-', 'text-'))}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}