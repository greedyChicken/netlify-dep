import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
}: DashboardCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      {trend && trendValue && (
        <div className="mt-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
              {
                'bg-green-100 text-green-800': trend === 'up',
                'bg-red-100 text-red-800': trend === 'down',
                'bg-gray-100 text-gray-800': trend === 'neutral',
              }
            )}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}