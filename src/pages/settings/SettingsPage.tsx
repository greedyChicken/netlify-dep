import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileSettings from './components/ProfileSettings';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';
import PreferenceSettings from './components/PreferenceSettings';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Settings</h1>
        <div className="grid grid-cols-1 gap-6">
          <ProfileSettings />
          <SecuritySettings />
          <NotificationSettings />
          <PreferenceSettings />
        </div>
      </div>
    </DashboardLayout>
  );
}