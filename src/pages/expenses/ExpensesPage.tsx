import { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import ExpensesList from './components/ExpensesList';
import ExpenseModal from './components/ExpenseModal';
import ExpenseFilters from './components/ExpenseFilters';

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Expenses</h1>
          <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>

        <ExpenseFilters />
        <div className="overflow-x-auto">
          <ExpensesList onEdit={setSelectedExpense} />
        </div>
        
        <ExpenseModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedExpense(null);
          }}
          expenseId={selectedExpense}
        />
      </div>
    </DashboardLayout>
  );
}