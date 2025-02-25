import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Edit } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import api from '@/lib/axios';
import type { Budget } from '@/types';

interface BudgetListProps {
  onEdit: (id: number) => void;
}

export default function BudgetList({ onEdit }: BudgetListProps) {
  const queryClient = useQueryClient();
  
  const { data: budgets } = useQuery<Budget[]>({
    queryKey: ['budgets'],
    queryFn: async () => {
      const { data } = await api.get('/budgets');
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/budgets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Period</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {budgets?.map((budget) => (
            <tr key={budget.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {budget.category}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {formatCurrency(budget.amount)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {budget.period}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <Button variant="ghost" size="sm" onClick={() => onEdit(budget.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(budget.id)}>
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