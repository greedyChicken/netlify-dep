import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Edit, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';
import api from '@/lib/axios';
import type { Expense } from '@/types';

interface ExpensesListProps {
  onEdit: (id: number) => void;
}

export default function ExpensesList({ onEdit }: ExpensesListProps) {
  const queryClient = useQueryClient();
  
  const { data: expenses, isLoading, error } = useQuery<Expense[]>({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data } = await api.get('/expenses');
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/expenses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading expenses</div>;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Recurring</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {expenses?.map((expense) => (
            <tr key={expense.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {expense.description}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {expense.category}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {formatCurrency(expense.amount)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {formatDate(expense.date)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {expense.isRecurring ? `Yes (${expense.recurringInterval})` : 'No'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(expense.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMutation.mutate(expense.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}