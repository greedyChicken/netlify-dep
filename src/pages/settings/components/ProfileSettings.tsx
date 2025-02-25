import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { User } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/axios';

interface ProfileForm {
  name: string;
  email: string;
  avatar?: FileList;
}

export default function ProfileSettings() {
  const { register, handleSubmit } = useForm<ProfileForm>();

  const mutation = useMutation({
    mutationFn: async (data: ProfileForm) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (data.avatar?.[0]) {
        formData.append('avatar', data.avatar[0]);
      }
      return api.put('/user/profile', formData);
    },
  });

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
        <User className="h-5 w-5 text-blue-500" />
        <h2 className="text-base font-medium sm:text-lg">Profile Information</h2>
      </div>

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <Input {...register('name')} className="mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input type="email" {...register('email')} className="mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <Input
            type="file"
            accept="image/*"
            {...register('avatar')}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Update Profile
        </Button>
      </form>
    </div>
  );
}