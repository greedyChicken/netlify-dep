import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/axios';

interface BudgetProgress {
  category: string;
  budgetAmount: number;
  spentAmount: number;
  percentage: number;
}

export default function BudgetProgress() {
  const { data: progress } = useQuery<BudgetProgress[]>({
    queryKey: ['budget-progress'],
    queryFn: async () => {
      const { data } = await api.get('/budgets/progress');
      return data;
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {progress?.map((item) => (
        <div key={item.category} className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-base font-medium text-gray-900 sm:text-lg">{item.category}</h3>
          <div className="mt-2">
            <div className="flex flex-col space-y-1 text-sm text-gray-600 sm:flex-row sm:justify-between sm:space-y-0">
              <span>Spent: {formatCurrency(item.spentAmount)}</span>
              <span>Budget: {formatCurrency(item.budgetAmount)}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${
                  item.percentage > 90 ? 'bg-red-500' : 
                  item.percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(item.percentage, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {item.percentage}% of budget used
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}