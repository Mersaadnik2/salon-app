import React, { useState } from 'react';
import { CustomerProfile } from '../../types';
import { formatPrice } from '../../data/initialData';
import { 
  Users, 
  Search, 
  Phone, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  FileText, 
  Plus, 
  Star,
  ChevronLeft,
  Crown
} from 'lucide-react';

interface CustomerListScreenProps {
  customers: CustomerProfile[];
  onSelectCustomer: (customer: CustomerProfile) => void;
  onOpenNewCustomer: () => void;
}

export const CustomerListScreen: React.FC<CustomerListScreenProps> = ({
  customers,
  onSelectCustomer,
  onOpenNewCustomer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phoneNumber.includes(searchQuery)
  );

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-5 bg-[#FAF7F5]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[#333333] flex items-center gap-2">
            <span>مشتریان من</span>
            <span className="text-xl">💁‍♀️</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">بانک اطلاعات مشتریان، سوابق مراجعات و پرونده زیبایی</p>
        </div>

        <button
          onClick={onOpenNewCustomer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B76E79] hover:bg-[#9E535E] text-white text-xs font-bold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>مشتری جدید</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو با نام یا شماره موبایل مشتری..."
          className="w-full pl-3 pr-9 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 text-xs outline-none transition"
        />
        <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
      </div>

      {/* Customers List */}
      <div className="space-y-2.5">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => onSelectCustomer(customer)}
            className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#B76E79]/40 hover:shadow-sm transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-100 to-[#FFF5E1] text-[#B76E79] font-black text-sm flex items-center justify-center relative">
                {customer.fullName.slice(0, 1)}
                {customer.isVip && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-[9px] shadow-xs">
                    ★
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#B76E79] transition-colors">
                    {customer.fullName}
                  </h3>
                  {customer.isVip && (
                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
                      <Crown className="w-2.5 h-2.5 text-[#D4AF37]" />
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-mono" dir="ltr">{customer.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div>
                <span className="text-[10px] text-gray-400 block">آخرین مراجعه</span>
                <span className="text-xs font-bold text-[#D4AF37]">{customer.lastVisitDate}</span>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-[#B76E79] group-hover:-translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

interface CustomerProfileScreenProps {
  customer: CustomerProfile;
  onBack: () => void;
  onBookForCustomer: (customer: CustomerProfile) => void;
  onSendSms: (customer: CustomerProfile) => void;
}

export const CustomerProfileScreen: React.FC<CustomerProfileScreenProps> = ({
  customer,
  onBack,
  onBookForCustomer,
  onSendSms,
}) => {
  return (
    <div className="flex-1 p-4 sm:p-6 space-y-5 bg-[#FAF7F5]">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
        >
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </button>
        <div>
          <h1 className="text-lg font-black text-gray-900">پرونده مشتری: {customer.fullName}</h1>
          <p className="text-[11px] text-gray-500 font-mono" dir="ltr">{customer.phoneNumber}</p>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#B76E79]/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#B76E79] to-[#D4AF37] text-white font-black text-lg flex items-center justify-center shadow-xs">
              {customer.fullName.slice(0, 1)}
            </div>
            <div>
              <h2 className="font-bold text-base text-gray-900">{customer.fullName}</h2>
              <span className="text-xs text-gray-500 font-mono" dir="ltr">{customer.phoneNumber}</span>
            </div>
          </div>

          {customer.isVip && (
            <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              مشتری طلایی (VIP)
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#FAF7F5] p-2.5 rounded-xl">
            <span className="text-gray-500 block mb-0.5">تاریخ تولد</span>
            <span className="font-bold text-gray-800">{customer.birthDate}</span>
          </div>
          <div className="bg-[#FAF7F5] p-2.5 rounded-xl">
            <span className="text-gray-500 block mb-0.5">آخرین مراجعه</span>
            <span className="font-bold text-gray-800">{customer.lastVisitDate}</span>
          </div>
          <div className="col-span-2 bg-[#FAF7F5] p-2.5 rounded-xl flex items-center justify-between">
            <span className="text-gray-500">مجموع خرید تا امروز:</span>
            <span className="font-black text-[#D4AF37] text-sm">{formatPrice(customer.totalSpent)} تومان</span>
          </div>
        </div>
      </div>

      {/* Special Hair & Beauty Notes (Very critical for salon staff) */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-2">
        <div className="flex items-center gap-1.5 text-gray-800 font-bold text-sm">
          <FileText className="w-4 h-4 text-[#B76E79]" />
          <span>یادداشت‌ها و فرمول‌های اختصاصی آرایشگر</span>
        </div>
        <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl text-xs text-amber-950 leading-relaxed">
          {customer.notes || 'یادداشتی برای این مشتری ثبت نشده است.'}
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => onSendSms(customer)}
          className="py-3 px-4 rounded-xl bg-white border border-[#B76E79] text-[#B76E79] hover:bg-pink-50 font-bold text-xs flex items-center justify-center gap-1.5 transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>ارسال پیامک یادآوری</span>
        </button>

        <button
          onClick={() => onBookForCustomer(customer)}
          className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#B76E79] to-[#9E535E] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#B76E79]/20 flex items-center justify-center gap-1.5 transition"
        >
          <Calendar className="w-4 h-4" />
          <span>ثبت نوبت برای مشتری</span>
        </button>
      </div>

    </div>
  );
};
