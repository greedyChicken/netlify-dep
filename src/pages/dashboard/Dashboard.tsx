import { useQuery } from '@tanstack/react-query';
import { PiggyBank, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import api from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';
import DashboardCard from './components/DashboardCard';
import RecentExpenses from './components/RecentExpenses';
import SpendingChart from './components/SpendingChart';

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await api.get('/stats/dashboard');
      return data;
    },
  });

  const defaultStats = {
    totalExpenses: 0,
    monthlyBudget: 0,
    monthlySpending: 0,
    savingsRate: 0,
  };

  const { totalExpenses, monthlyBudget, monthlySpending, savingsRate } = stats || defaultStats;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={DollarSign}
          trend="up"
          trendValue="12%"
        />
        <DashboardCard
          title="Monthly Budget"
          value={formatCurrency(monthlyBudget)}
          icon={PiggyBank}
          trend="neutral"
        />
        <DashboardCard
          title="Monthly Spending"
          value={formatCurrency(monthlySpending)}
          icon={TrendingUp}
          trend="down"
          trendValue="8%"
        />
        <DashboardCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          icon={TrendingDown}
          trend="up"
          trendValue="5%"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SpendingChart />
        <RecentExpenses />
      </div>
    </div>
  );
}