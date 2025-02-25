import DashboardLayout from '@/components/layout/DashboardLayout';
import ReportGenerator from './components/ReportGenerator';
import ReportsList from './components/ReportsList';
import ReportFilters from './components/ReportFilters';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <ReportGenerator />
        <ReportFilters />
        <ReportsList />
      </div>
    </DashboardLayout>
  );
}