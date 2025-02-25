import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/axios';

interface ReportForm {
  startDate: string;
  endDate: string;
  format: 'pdf' | 'excel';
  includeCharts: boolean;
  categories: string[];
}

export default function ReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit } = useForm<ReportForm>();

  const onSubmit = async (data: ReportForm) => {
    try {
      setIsGenerating(true);
      const response = await api.post('/reports/generate', data, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expense-report-${data.startDate}-${data.endDate}.${data.format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-blue-500" />
        <h2 className="text-base font-medium sm:text-lg">Generate Report</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <Input type="date" {...register('startDate', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <Input type="date" {...register('endDate', { required: true })} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Format</label>
          <select
            {...register('format')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categories</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {['FOOD', 'TRANSPORT', 'UTILITIES', 'ENTERTAINMENT', 'SHOPPING', 'OTHERS'].map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  value={category}
                  {...register('categories')}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('includeCharts')}
            className="rounded border-gray-300 text-blue-600"
          />
          <label className="ml-2 text-sm text-gray-700">Include charts and graphs</label>
        </div>

        <Button type="submit" disabled={isGenerating} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </Button>
      </form>
    </div>
  );
}