import React, { useState } from 'react';
import { AuthState, UserRole } from '../../types';
import { Sparkles, Phone, ShieldCheck, ArrowRight, Store, User } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [authState, setAuthState] = useState<AuthState>('ENTER_PHONE');
  const [phoneNumber, setPhoneNumber] = useState('09123456789');
  const [otpCode, setOtpCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('SALON_OWNER');
  const [timer, setTimer] = useState(120);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setAuthState('WAITING_FOR_OTP');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6 || otpCode === '123456' || otpCode === '۱۲۳۴۵۶') {
      onLoginSuccess(selectedRole);
    } else {
      // Auto allow demo login on submit
      onLoginSuccess(selectedRole);
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setSelectedRole(role);
    onLoginSuccess(role);
  };

  return (
    <div className="flex-1 min-h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#FFF5E1]/40 via-[#FAF7F5] to-[#FFD1DC]/30">
      
      {/* Brand Hero Logo */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#B76E79] via-[#D4AF37] to-[#B76E79] shadow-lg shadow-[#B76E79]/20 text-white font-black text-3xl mb-3">
          زی
        </div>
        <h1 className="text-3xl font-black text-[#333333] tracking-tight">
          زیبانو
        </h1>
        <p className="text-xs text-gray-500 mt-1">پلتفرم هوشمند مدیریت سالن زیبایی و نوبت‌دهی</p>
      </div>

      {/* Role Selection Switcher */}
      <div className="w-full max-w-sm mb-4 bg-white/80 p-1 rounded-xl shadow-xs border border-gray-200 flex gap-1">
        <button
          type="button"
          onClick={() => setSelectedRole('SALON_OWNER')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            selectedRole === 'SALON_OWNER'
              ? 'bg-[#B76E79] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>ورود به عنوان سالن‌دار</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedRole('CUSTOMER')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            selectedRole === 'CUSTOMER'
              ? 'bg-[#B76E79] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>ورود به عنوان مشتری</span>
        </button>
      </div>

      {/* Auth Card Container */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl shadow-black/5 p-6 border border-[#B76E79]/15">
        {authState === 'ENTER_PHONE' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">ورود / ثبت‌نام سریع</h2>
              <p className="text-xs text-gray-500 mt-0.5">شماره موبایل خود را جهت دریافت کد تایید پیامکی وارد کنید</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">شماره موبایل</label>
              <div className="relative">
                <input
                  type="tel"
                  dir="ltr"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="09123456789"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 outline-none text-sm font-mono text-center tracking-wider transition"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B76E79] to-[#9E535E] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-[#B76E79]/25 transition active:scale-[0.98]"
            >
              دریافت کد تایید پیامکی
            </button>

            {/* Quick Demo Access */}
            <div className="pt-3 border-t border-gray-100 text-center">
              <span className="text-[11px] text-gray-400">ورود سریع تستی (بدون نیاز به کد):</span>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('SALON_OWNER')}
                  className="flex-1 py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60 rounded-lg text-xs font-semibold transition"
                >
                  ⚡ ورود پنل سالن‌دار
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('CUSTOMER')}
                  className="flex-1 py-1.5 px-2 bg-pink-50 hover:bg-pink-100 text-[#B76E79] border border-pink-200/60 rounded-lg text-xs font-semibold transition"
                >
                  🌸 ورود پنل مشتری
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">کد تایید پیامکی</h2>
                <p className="text-xs text-gray-500 mt-0.5">کد ارسال شده به {phoneNumber} را وارد کنید</p>
              </div>
              <button
                type="button"
                onClick={() => setAuthState('ENTER_PHONE')}
                className="text-xs text-[#B76E79] hover:underline"
              >
                تغییر شماره
              </button>
            </div>

            <div className="space-y-1.5">
              <input
                type="text"
                dir="ltr"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="۱۲۳۴۵۶"
                className="w-full px-3.5 py-3 rounded-xl border border-gray-300 focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 outline-none text-xl font-mono text-center tracking-[0.4em] font-bold text-[#B76E79] transition"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                <button
                  type="button"
                  onClick={() => setOtpCode('123456')}
                  className="text-[#B76E79] hover:underline font-medium"
                >
                  درج خودکار کد دمو (123456)
                </button>
                <span>ارسال مجدد ({timer} ثانیه)</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B76E79] to-[#9E535E] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-[#B76E79]/25 transition active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>تایید و ورود به اپلیکیشن</span>
            </button>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-xs text-gray-400 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>طراحی شده با کاتلین و Jetpack Compose</span>
      </div>

    </div>
  );
};
