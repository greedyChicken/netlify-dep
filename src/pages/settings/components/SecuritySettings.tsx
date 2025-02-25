import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/axios';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SecuritySettings() {
  const { register, handleSubmit, reset } = useForm<PasswordForm>();

  const mutation = useMutation({
    mutationFn: (data: PasswordForm) => api.put('/user/password', data),
    onSuccess: () => reset(),
  });

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
        <Shield className="h-5 w-5 text-blue-500" />
        <h2 className="text-base font-medium sm:text-lg">Security</h2>
      </div>

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <Input
            type="password"
            {...register('currentPassword', { required: true })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <Input
            type="password"
            {...register('newPassword', { required: true })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <Input
            type="password"
            {...register('confirmPassword', { required: true })}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Change Password
        </Button>
      </form>
    </div>
  );
}