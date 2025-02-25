import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ExpenseFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      searchParams.set('search', search);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </form>

      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        onChange={(e) => {
          if (e.target.value) {
            searchParams.set('category', e.target.value);
          } else {
            searchParams.delete('category');
          }
          setSearchParams(searchParams);
        }}
        value={searchParams.get('category') || ''}
      >
        <option value="">All Categories</option>
        <option value="FOOD">Food</option>
        <option value="TRANSPORT">Transport</option>
        <option value="UTILITIES">Utilities</option>
        <option value="ENTERTAINMENT">Entertainment</option>
        <option value="SHOPPING">Shopping</option>
        <option value="OTHERS">Others</option>
      </select>

      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        onChange={(e) => {
          if (e.target.value) {
            searchParams.set('period', e.target.value);
          } else {
            searchParams.delete('period');
          }
          setSearchParams(searchParams);
        }}
        value={searchParams.get('period') || ''}
      >
        <option value="">All Time</option>
        <option value="THIS_WEEK">This Week</option>
        <option value="THIS_MONTH">This Month</option>
        <option value="LAST_MONTH">Last Month</option>
        <option value="THIS_YEAR">This Year</option>
      </select>
    </div>
  );
}