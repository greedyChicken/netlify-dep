import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/axios';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgetId: number | null;
}

interface BudgetForm {
  amount: number;
  category: string;
  period: 'MONTHLY' | 'YEARLY';
}

export default function BudgetModal({ isOpen, onClose, budgetId }: BudgetModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<BudgetForm>();

  const { data: budget } = useQuery({
    queryKey: ['budget', budgetId],
    queryFn: async () => {
      if (!budgetId) return null;
      const { data } = await api.get(`/budgets/${budgetId}`);
      return data;
    },
    enabled: !!budgetId,
  });

  const mutation = useMutation({
    mutationFn: (data: BudgetForm) => {
      if (budgetId) {
        return api.put(`/budgets/${budgetId}`, data);
      }
      return api.post('/budgets', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      onClose();
      reset();
    },
  });

  useEffect(() => {
    if (budget) {
      reset(budget);
    }
  }, [budget, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="relative w-full max-w-md rounded-lg bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {budgetId ? 'Edit Budget' : 'Set New Budget'}
            </h3>
            <button onClick={onClose}>
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                {...register('category')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="FOOD">Food</option>
                <option value="TRANSPORT">Transport</option>
                <option value="UTILITIES">Utilities</option>
                <option value="ENTERTAINMENT">Entertainment</option>
                <option value="SHOPPING">Shopping</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <Input type="number" step="0.01" {...register('amount', { required: true })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Period</label>
              <select
                {...register('period')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {budgetId ? 'Update' : 'Set'} Budget
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}