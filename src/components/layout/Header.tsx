import { BellIcon, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden -m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <BellIcon className="h-6 w-6" />
          </button>
          <Button variant="outline" onClick={handleLogout} className="hidden sm:inline-flex">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}