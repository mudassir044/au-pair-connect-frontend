import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Search, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Settings,
  Users,
  BarChart3
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', href: `/dashboard/${user?.role?.replace('_', '-')}` },
      { icon: Search, label: 'Matches', href: `/dashboard/${user?.role?.replace('_', '-')}/matches` },
      { icon: MessageSquare, label: 'Messages', href: `/dashboard/${user?.role?.replace('_', '-')}/messages` },
      { icon: Calendar, label: 'Bookings', href: `/dashboard/${user?.role?.replace('_', '-')}/bookings` },
      { icon: FileText, label: 'Documents', href: `/dashboard/${user?.role?.replace('_', '-')}/documents` },
    ];

    if (user?.role === 'admin') {
      return [
        { icon: BarChart3, label: 'Overview', href: '/dashboard/admin' },
        { icon: Users, label: 'Users', href: '/dashboard/admin/users' },
        { icon: FileText, label: 'Documents', href: '/dashboard/admin/documents' },
        { icon: Settings, label: 'Settings', href: '/dashboard/admin/settings' },
      ];
    }

    return [...baseItems, { icon: Settings, label: 'Profile', href: '/profile' }];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden w-64 border-r bg-card lg:block">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-6">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-primary"></div>
                <span className="text-lg font-semibold">Dashboard</span>
              </Link>
            </div>
            
            <nav className="flex-1 space-y-1 px-4 py-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};