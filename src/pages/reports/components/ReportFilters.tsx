import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Input from '@/components/ui/Input';

export default function ReportFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex-1">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search reports..."
            value={searchParams.get('search') || ''}
            onChange={(e) => {
              if (e.target.value) {
                searchParams.set('search', e.target.value);
              } else {
                searchParams.delete('search');
              }
              setSearchParams(searchParams);
            }}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={searchParams.get('format') || ''}
        onChange={(e) => {
          if (e.target.value) {
            searchParams.set('format', e.target.value);
          } else {
            searchParams.delete('format');
          }
          setSearchParams(searchParams);
        }}
      >
        <option value="">All Formats</option>
        <option value="pdf">PDF</option>
        <option value="excel">Excel</option>
      </select>
    </div>
  );
}