import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/axios';

interface Insight {
  type: 'increase' | 'decrease' | 'alert';
  category: string;
  message: string;
  value: number;
  percentage?: number;
}

export default function SpendingInsights() {
  const { data: insights } = useQuery<Insight[]>({
    queryKey: ['spending-insights'],
    queryFn: async () => {
      const { data } = await api.get('/analytics/insights');
      return data;
    },
  });

  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'increase':
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case 'decrease':
        return <TrendingDown className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Spending Insights</h3>
      <div className="mt-4 space-y-4">
        {insights?.map((insight, index) => (
          <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
            {getIcon(insight.type)}
            <div>
              <p className="font-medium text-gray-900">{insight.category}</p>
              <p className="text-sm text-gray-600">{insight.message}</p>
              <p className="mt-1 text-sm">
                <span className="font-medium">{formatCurrency(insight.value)}</span>
                {insight.percentage && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({insight.percentage > 0 ? '+' : ''}{insight.percentage}%)
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}