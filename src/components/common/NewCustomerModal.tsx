import React, { useState } from 'react';
import { CustomerProfile } from '../../types';
import { X, UserPlus, Phone, Calendar, FileText, Crown } from 'lucide-react';

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomer: (customer: Omit<CustomerProfile, 'id'>) => void;
}

export const NewCustomerModal: React.FC<NewCustomerModalProps> = ({
  isOpen,
  onClose,
  onAddCustomer,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0912');
  const [birthDate, setBirthDate] = useState('۱۳۷۵/۰۵/۰۱');
  const [notes, setNotes] = useState('');
  const [isVip, setIsVip] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    onAddCustomer({
      fullName,
      phoneNumber,
      birthDate,
      lastVisitDate: '۱۴۰۵/۰۵/۲۰ (امروز)',
      totalSpent: 0,
      notes,
      isVip,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 border border-[#B76E79]/20 text-[#333333]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-[#D4AF37]">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900">تشکیل پرونده مشتری جدید</h3>
              <p className="text-[11px] text-gray-500">ثبت اطلاعات تماس و سوابق آرایشی مشتری</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="مثلاً الهام احمدی"
              required
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">شماره موبایل</label>
            <input
              type="tel"
              dir="ltr"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="09120000000"
              required
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none font-mono text-left"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">تاریخ تولد (جهت پیامک تبریک)</label>
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="۱۳۷۵/۰۵/۰۱"
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">یادداشت‌های اختصاصی و فرمول‌های رنگ مو</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="فرمول ترکیب رنگ، حساسیت پوستی، ترجیحات و علایق مشتری..."
              rows={2}
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="chk-vip"
              checked={isVip}
              onChange={(e) => setIsVip(e.target.checked)}
              className="w-4 h-4 rounded text-[#B76E79] focus:ring-[#B76E79]"
            />
            <label htmlFor="chk-vip" className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>علامت‌گذاری به عنوان مشتری ویژه (VIP)</span>
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#B76E79] hover:bg-[#9E535E] text-white font-bold transition shadow-xs"
            >
              تشکیل پرونده
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
