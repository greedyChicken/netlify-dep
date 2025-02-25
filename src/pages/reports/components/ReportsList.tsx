import { useQuery } from '@tanstack/react-query';
import { Download, Trash2, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';
import api from '@/lib/axios';

interface Report {
  id: number;
  name: string;
  format: 'pdf' | 'excel';
  createdAt: string;
  startDate: string;
  endDate: string;
  downloadUrl: string;
}

export default function ReportsList() {
  const { data: reports } = useQuery<Report[]>({
    queryKey: ['reports'],
    queryFn: async () => {
      const { data } = await api.get('/reports');
      return data;
    },
  });

  const downloadReport = async (report: Report) => {
    const response = await api.get(report.downloadUrl, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', report.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <h3 className="text-base font-medium text-gray-900 sm:text-lg">Generated Reports</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {reports?.map((report) => (
          <li key={report.id} className="px-4 py-4 sm:px-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-start sm:items-center">
                <FileText className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {formatDate(report.startDate)} - {formatDate(report.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadReport(report)}
                  className="flex-1 sm:flex-none"
                >
                  <Download className="h-4 w-4" />
                  <span className="ml-2 sm:hidden">Download</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // Handle delete
                  }}
                  className="flex-1 sm:flex-none"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="ml-2 sm:hidden">Delete</span>
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}