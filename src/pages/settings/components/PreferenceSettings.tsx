import { useMutation } from '@tanstack/react-query';
import { Settings } from 'lucide-react';
import Button from '@/components/ui/Button';
import api from '@/lib/axios';

export default function PreferenceSettings() {
  const mutation = useMutation({
    mutationFn: (settings: Record<string, string>) => api.put('/user/preferences', settings),
  });

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
        <Settings className="h-5 w-5 text-blue-500" />
        <h2 className="text-base font-medium sm:text-lg">Preferences</h2>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => mutation.mutate({ currency: e.target.value })}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date Format</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => mutation.mutate({ dateFormat: e.target.value })}
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Theme</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => mutation.mutate({ theme: e.target.value })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
    </div>
  );
}