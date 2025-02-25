import { useMutation } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import Button from '@/components/ui/Button';
import api from '@/lib/axios';

export default function NotificationSettings() {
  const mutation = useMutation({
    mutationFn: (settings: Record<string, boolean>) => api.put('/user/notifications', settings),
  });

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
        <Bell className="h-5 w-5 text-blue-500" />
        <h2 className="text-base font-medium sm:text-lg">Notifications</h2>
      </div>

      <div className="mt-4 space-y-4">
        {[
          { id: 'expense_alerts', label: 'Expense Alerts' },
          { id: 'budget_reminders', label: 'Budget Reminders' },
          { id: 'report_notifications', label: 'Report Notifications' },
          { id: 'security_alerts', label: 'Security Alerts' },
        ].map(({ id, label }) => (
          <div key={id} className="flex items-center justify-between">
            <label htmlFor={id} className="text-sm text-gray-700">
              {label}
            </label>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id={id}
                className="peer sr-only"
                onChange={(e) => mutation.mutate({ [id]: e.target.checked })}
              />
              <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}