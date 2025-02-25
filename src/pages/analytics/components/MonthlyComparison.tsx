import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/axios';

export default function MonthlyComparison() {
  const { data: comparison } = useQuery({
    queryKey: ['monthly-comparison'],
    queryFn: async () => {
      const { data } = await api.get('/analytics/monthly-comparison');
      return data;
    },
  });

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Monthly Comparison</h3>
      <div className="mt-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="thisYear" name="This Year" fill="#3B82F6" />
            <Bar dataKey="lastYear" name="Last Year" fill="#93C5FD" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}