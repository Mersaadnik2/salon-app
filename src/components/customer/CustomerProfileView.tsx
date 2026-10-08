import React from 'react';
import { 
  Heart, 
  User, 
  CreditCard, 
  Headphones, 
  LogOut, 
  ChevronLeft, 
  MapPin,
  Sparkles
} from 'lucide-react';

interface CustomerProfileViewProps {
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({
  onLogout,
  onShowToast,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#fff8f8] text-[#1f1a1c] pb-24">
      {/* TopAppBar matching Stitch */}
      <header className="sticky top-0 w-full z-40 bg-[#fff8f8]/80 backdrop-blur-md border-b border-[#d4c2c7]/30 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#31081d]/20 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZmQGhRihsZLYr2tcGaZT1fDOcqSX5yxTjlazvFVeEYHDvGJPFjQ0RFaGSnzsEZLFATK7umrKGLsoilK8HK4_rAQSAD7-abFU4rAEEpTmH4egyvsQISp2O6L_CXyp_knz3WA7SluK6yPxm8ymb2xgNI1MI4s6lZMd1rqNg0mpNIgOea82swap-u34bxLLge2sO12tHGRmxuzMBRkGMw--sd9CTmASbsLrWdpAYhZ-w00i7a3-dLpR-iw"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-base font-bold text-[#31081d] tracking-tight">Zibano</h1>
        </div>
        <button 
          onClick={() => onShowToast('موقعیت: تهران، خیابان فرشته')}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f6ebed] transition text-[#504348]"
        >
          <MapPin className="w-5 h-5 text-[#7c5357]" />
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto w-full px-4 pt-4 space-y-5">
        
        {/* Profile Header & Stats Bento */}
        <div className="bg-[#f6ebed] rounded-2xl p-5 shadow-[0_8px_30px_rgba(49,8,29,0.05)] border border-[#d4c2c7]/30 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white shadow-md mb-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHhhrXsEqrvVkBTZk7aQwwNwsOmc5oBUyA935RmLKQzx-95bc6099Egi06ST3lg1BPsB0LFYhlrWK137tt-g_LkUk9zMeqBvHMLxaARcy8-LwvhsZiUMUIlNky3Cj02lErTDjZq7pdHlsaI6WS8zyro1Aj8piikgi6WUNYMeY0AZYmsa3SExw47mkA425AIUXxW8jVpA0gbw6fKypfXwodXfqHdtKPnRWRYaKk0V9NFdi7nsZNJeSBvg"
              alt="Portrait of Sara"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-lg font-bold text-[#31081d] mb-0.5">سارا احمدی</h2>
          <p className="text-xs text-[#504348] font-mono mb-4" dir="ltr">+98 912 345 6789</p>

          {/* Stats Bento */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-[#FDFCFB] rounded-xl p-3 shadow-xs border border-[#d4c2c7]/20 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#31081d] mb-0.5">۱۲</span>
              <span className="text-[11px] text-[#504348] text-center">کل رزروها</span>
            </div>
            <div className="bg-[#FDFCFB] rounded-xl p-3 shadow-xs border border-[#d4c2c7]/20 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#D4AF37] mb-0.5">۲</span>
              <span className="text-[11px] text-[#504348] text-center">سالن‌های مورد علاقه</span>
            </div>
          </div>
        </div>

        {/* Menu Items matching Stitch */}
        <div className="bg-[#f6ebed] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(49,8,29,0.03)] border border-[#d4c2c7]/30 flex flex-col">
          {/* Favorites List */}
          <button
            onClick={() => onShowToast('۲ سالن در لیست علاقه‌مندی‌های شما ذخیره شده است.')}
            className="w-full flex items-center justify-between p-4 hover:bg-[#ebe0e2] transition-colors border-b border-[#d4c2c7]/20 group text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F5EFF2] flex items-center justify-center text-[#31081d] group-hover:scale-105 transition-transform shadow-2xs">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#31081d]">لیست علاقه‌مندی‌ها</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-[#504348]" />
          </button>

          {/* Personal Info */}
          <button
            onClick={() => onShowToast('اطلاعات کاربری: سارا احمدی - تهران')}
            className="w-full flex items-center justify-between p-4 hover:bg-[#ebe0e2] transition-colors border-b border-[#d4c2c7]/20 group text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F5EFF2] flex items-center justify-center text-[#31081d] group-hover:scale-105 transition-transform shadow-2xs">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#31081d]">اطلاعات شخصی</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-[#504348]" />
          </button>

          {/* Payment Methods */}
          <button
            onClick={() => onShowToast('درگاه‌های فعال: پرداخت آنلاین شاپرک، کیف پول زیبانو')}
            className="w-full flex items-center justify-between p-4 hover:bg-[#ebe0e2] transition-colors border-b border-[#d4c2c7]/20 group text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F5EFF2] flex items-center justify-center text-[#31081d] group-hover:scale-105 transition-transform shadow-2xs">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#31081d]">روش‌های پرداخت</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-[#504348]" />
          </button>

          {/* Support */}
          <button
            onClick={() => onShowToast('پشتیبانی ۲۴ ساعته زیبانو: ۰۲۱-۸۸۹۹۳۳۴۴')}
            className="w-full flex items-center justify-between p-4 hover:bg-[#ebe0e2] transition-colors group text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F5EFF2] flex items-center justify-center text-[#31081d] group-hover:scale-105 transition-transform shadow-2xs">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#31081d]">پشتیبانی</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-[#504348]" />
          </button>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#FDFCFB] border border-red-200 text-red-700 hover:bg-red-50 transition-all active:scale-95 text-xs font-bold shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج از حساب</span>
          </button>
        </div>

      </main>
    </div>
  );
};
