import { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import BudgetList from './components/BudgetList';
import BudgetModal from './components/BudgetModal';
import BudgetProgress from './components/BudgetProgress';

export default function BudgetPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Budget Management</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Set New Budget
          </Button>
        </div>

        <BudgetProgress />
        <BudgetList onEdit={setSelectedBudget} />
        
        <BudgetModal 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBudget(null);
          }}
          budgetId={selectedBudget}
        />
      </div>
    </DashboardLayout>
  );
}