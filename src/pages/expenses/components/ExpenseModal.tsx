import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/axios';
import type { Expense } from '@/types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseId: number | null;
}

interface ExpenseForm {
  description: string;
  amount: number;
  category: string;
  date: string;
  isRecurring: boolean;
  recurringInterval?: 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}

export default function ExpenseModal({ isOpen, onClose, expenseId }: ExpenseModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, watch, setValue } = useForm<ExpenseForm>();
  const isRecurring = watch('isRecurring');

  const { data: expense } = useQuery({
    queryKey: ['expense', expenseId],
    queryFn: async () => {
      if (!expenseId) return null;
      const { data } = await api.get(`/expenses/${expenseId}`);
      return data;
    },
    enabled: !!expenseId,
  });

  const mutation = useMutation({
    mutationFn: (data: ExpenseForm) => {
      if (expenseId) {
        return api.put(`/expenses/${expenseId}`, data);
      }
      return api.post('/expenses', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      onClose();
      reset();
    },
  });

  useEffect(() => {
    if (expense) {
      reset(expense);
    }
  }, [expense, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="relative w-full max-w-md rounded-lg bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {expenseId ? 'Edit Expense' : 'Add Expense'}
            </h3>
            <button onClick={onClose}>
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Input {...register('description', { required: true })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <Input type="number" step="0.01" {...register('amount', { required: true })} />
            </div>

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
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <Input type="date" {...register('date', { required: true })} />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('isRecurring')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <label className="ml-2 block text-sm text-gray-900">Recurring Expense</label>
            </div>

            {isRecurring && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Interval</label>
                <select
                  {...register('recurringInterval')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {expenseId ? 'Update' : 'Add'} Expense
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}