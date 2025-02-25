import { useQuery } from '@tanstack/react-query';
import { formatCurrency, formatDate } from '@/lib/utils';
import api from '@/lib/axios';
import type { Expense } from '@/types';

export default function RecentExpenses() {
  const { data: expenses } = useQuery<Expense[]>({
    queryKey: ['recent-expenses'],
    queryFn: async () => {
      const { data } = await api.get('/expenses/recent');
      return data;
    },
  });

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Recent Expenses</h3>
      <div className="mt-6 flow-root">
        <ul className="-my-5 divide-y divide-gray-200">
          {expenses?.map((expense) => (
            <li key={expense.id} className="py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(expense.amount)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}