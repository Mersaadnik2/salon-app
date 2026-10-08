import React from 'react';
import { ActiveScreen, UserRole } from '../../types';
import { 
  Home, 
  Calendar, 
  Users, 
  TrendingUp, 
  User, 
  Building2,
  Heart
} from 'lucide-react';

interface BottomNavProps {
  currentScreen: ActiveScreen;
  userRole: UserRole;
  pendingAppointmentsCount: number;
  onNavigate: (screen: ActiveScreen) => void;
  onSwitchRole: () => void;
}

interface TabItem {
  id: ActiveScreen;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  userRole,
  pendingAppointmentsCount,
  onNavigate,
}) => {
  if (userRole === 'SALON_OWNER') {
    const ownerTabs: TabItem[] = [
      { id: 'owner_home', label: 'داشبورد', icon: Home },
      { id: 'appointments', label: 'نوبت‌ها', icon: Calendar, badge: pendingAppointmentsCount },
      { id: 'customers', label: 'مشتریان', icon: Users },
      { id: 'reports', label: 'گزارشات', icon: TrendingUp },
      { id: 'owner_profile', label: 'تنظیمات', icon: Building2 },
    ];

    return (
      <nav className="sticky bottom-0 inset-x-0 bg-[#fff8f8]/95 backdrop-blur-md border-t border-[#d4c2c7]/30 px-2 py-1 z-40 shadow-[0_-4px_20px_rgba(49,8,29,0.06)]">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {ownerTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentScreen === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id as ActiveScreen)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-[#31081d] font-bold scale-105'
                    : 'text-[#827378] hover:text-[#31081d]'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#31081d] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                      {tab.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] mt-0.5 whitespace-nowrap">{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // CUSTOMER TABS MATCHING GOOGLE STITCH EXPORT
  const customerTabs: TabItem[] = [
    { id: 'customer_home', label: 'خانه', icon: Home },
    { id: 'appointments', label: 'رزروها', icon: Calendar },
    { id: 'salon_detail', label: 'علاقه‌مندی‌ها', icon: Heart },
    { id: 'owner_profile', label: 'پروفایل', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 inset-x-0 bg-[#fff8f8]/95 backdrop-blur-md border-t border-[#d4c2c7]/30 px-3 py-1.5 z-40 shadow-[0_-4px_20px_rgba(49,8,29,0.06)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {customerTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id as ActiveScreen)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#D4AF37] font-bold scale-105'
                  : 'text-[#827378] hover:text-[#31081d]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-[#D4AF37]' : ''}`} />
              <span className={`text-[10px] mt-0.5 whitespace-nowrap ${isActive ? 'text-[#31081d] font-bold' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -top-1 inset-x-2 h-0.5 bg-[#D4AF37] rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

