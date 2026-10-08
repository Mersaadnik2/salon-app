import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  Crown, 
  MessageSquare, 
  ShieldCheck, 
  LogOut, 
  ChevronLeft, 
  Sparkles,
  MapPin,
  Phone,
  Check
} from 'lucide-react';

interface OwnerProfileScreenProps {
  salonName: string;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export const OwnerProfileScreen: React.FC<OwnerProfileScreenProps> = ({
  salonName,
  onLogout,
  onShowToast,
}) => {
  const [autoSmsEnabled, setAutoSmsEnabled] = useState(true);
  const [workingHours, setWorkingHours] = useState('۰۹:۳۰ الی ۲۰:۰۰');

  const handleToggleSms = () => {
    setAutoSmsEnabled(!autoSmsEnabled);
    onShowToast(!autoSmsEnabled ? 'ارسال پیامک یادآوری خودکار فعال شد' : 'ارسال پیامک غیرفعال شد');
  };

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-5 bg-[#FAF7F5]">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-[#333333] flex items-center gap-2">
          <span>حساب کاربری سالن</span>
          <span className="text-xl">🏢</span>
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">تنظیمات پروفایل سالن، اشتراک و پیام‌های خودکار</p>
      </div>

      {/* Subscription Card */}
      <div className="bg-gradient-to-br from-[#FFF5E1] to-pink-50 p-4 rounded-2xl border border-[#D4AF37]/40 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-white flex items-center justify-center shadow-xs">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-gray-900">اشتراک حرفه‌ای سالن (VIP)</h3>
              </div>
              <p className="text-xs text-[#B76E79] font-medium">اعتبار: ۴۵ روز دیگر باقی‌مانده</p>
            </div>
          </div>

          <button
            onClick={() => onShowToast('درخواست تمدید اشتراک به پشتیبانی ارسال شد')}
            className="px-3.5 py-1.5 bg-[#B76E79] hover:bg-[#9E535E] text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            تمدید
          </button>
        </div>
      </div>

      {/* Salon Information Summary */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#B76E79]" />
          <span>مشخصات سالن زیبایی</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">نام سالن:</span>
            <span className="font-bold text-gray-800">{salonName}</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">شماره تماس پشتیبانی:</span>
            <span className="font-mono text-gray-800" dir="ltr">021-22001122</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">ساعات کاری:</span>
            <span className="font-bold text-gray-800">{workingHours} (به جز جمعه‌ها)</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">آدرس:</span>
            <span className="text-gray-700">تهران، زعفرانیه، خیابان مقدس اردبیلی</span>
          </div>
        </div>
      </div>

      {/* Automated SMS Reminders Setting */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">پیامک خودکار یادآوری نوبت</h4>
            <p className="text-[11px] text-gray-500">ارسال پیامک ۲ ساعت قبل از نوبت برای مشتری</p>
          </div>
        </div>

        <button
          onClick={handleToggleSms}
          className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
            autoSmsEnabled ? 'bg-emerald-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform transform ${
              autoSmsEnabled ? '-translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Logout Button */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center gap-2 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>خروج از حساب کاربری</span>
        </button>
      </div>

    </div>
  );
};
