import DashboardLayout from '@/components/layout/DashboardLayout';
import SpendingTrends from './components/SpendingTrends';
import CategoryDistribution from './components/CategoryDistribution';
import MonthlyComparison from './components/MonthlyComparison';
import SpendingInsights from './components/SpendingInsights';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Analytics & Insights</h1>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SpendingTrends />
          <CategoryDistribution />
        </div>

        <MonthlyComparison />
        <SpendingInsights />
      </div>
    </DashboardLayout>
  );
}