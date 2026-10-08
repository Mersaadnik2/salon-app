import React, { useState } from 'react';
import { Appointment, ActiveScreen } from '../../types';
import { formatPrice } from '../../data/initialData';
import { 
  Calendar, 
  DollarSign, 
  UserPlus, 
  PlusCircle, 
  Scissors, 
  TrendingUp, 
  Phone, 
  Check, 
  X, 
  Clock, 
  ChevronLeft,
  Sparkles,
  Users,
  Bell
} from 'lucide-react';
import { ConfirmAppointmentModal } from './ConfirmAppointmentModal';

interface OwnerHomeScreenProps {
  salonName: string;
  appointments: Appointment[];
  onNavigate: (screen: ActiveScreen) => void;
  onOpenNewAppointment: () => void;
  onOpenNewCustomer: () => void;
  onConfirmAppointment: (id: string, customSmsText?: string) => void;
  onCancelAppointment: (id: string) => void;
}

export const OwnerHomeScreen: React.FC<OwnerHomeScreenProps> = ({
  salonName,
  appointments,
  onNavigate,
  onOpenNewAppointment,
  onOpenNewCustomer,
  onConfirmAppointment,
  onCancelAppointment,
}) => {
  const [confirmModalApt, setConfirmModalApt] = useState<Appointment | null>(null);

  const todayAppointments = appointments.filter(a => a.dateShamsi.includes('امروز'));
  const totalTodayRevenue = todayAppointments
    .filter(a => a.status !== 'CANCELLED')
    .reduce((sum, a) => sum + a.price, 0);

  const pendingCount = appointments.filter(a => a.status === 'NEW').length;

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-6 bg-[#fff8f8] text-[#1f1a1c]">
      
      {/* Header Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#31081d] flex items-center gap-2">
            <span>سلام، {salonName}</span>
            <span className="inline-block animate-wave text-xl">👋</span>
          </h1>
          <p className="text-xs text-[#504348] mt-1">شنبه ۲۰ مرداد ۱۴۰۵ • امروز پرانرژی باشید!</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            سالن باز است
          </span>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div>
        <h2 className="text-sm font-bold text-[#31081d] mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>خلاصه آمار امروز</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Appointments Count */}
          <div className="bg-[#FDFCFB] p-3.5 rounded-2xl border border-[#d4c2c7]/40 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#504348] mb-2">
              <span className="text-xs font-medium">نوبت‌های امروز</span>
              <div className="p-1.5 rounded-xl bg-[#f6ebed] text-[#31081d]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#31081d]">{todayAppointments.length}</span>
              <span className="text-[11px] text-[#504348] mr-1">رزرو شده</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-[#FDFCFB] p-3.5 rounded-2xl border border-[#d4c2c7]/40 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#504348] mb-2">
              <span className="text-xs font-medium">درآمد تقریبی</span>
              <div className="p-1.5 rounded-xl bg-amber-50 text-[#D4AF37]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-[#D4AF37]">
                {formatPrice(totalTodayRevenue || 3500000)}
              </span>
              <span className="text-[10px] text-[#504348] mr-1">تومان</span>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="col-span-2 sm:col-span-1 bg-[#f6ebed] p-3.5 rounded-2xl border border-[#d4c2c7]/50 shadow-xs flex sm:flex-col justify-between items-center sm:items-start">
            <div className="flex items-center gap-2 text-[#31081d]">
              <div className="p-1.5 rounded-xl bg-[#31081d] text-white">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">درخواست جدید</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#31081d]">{pendingCount}</span>
              <span className="text-xs text-[#504348]">نیاز به تایید</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-sm font-bold text-[#31081d] mb-3">دسترسی سریع</h2>

        <div className="grid grid-cols-4 gap-2.5">
          <button
            id="btn-quick-new-apt"
            onClick={onOpenNewAppointment}
            className="flex flex-col items-center p-2.5 bg-[#FDFCFB] rounded-2xl border border-[#d4c2c7]/40 hover:border-[#31081d]/30 hover:shadow-xs transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#f6ebed] group-hover:bg-[#31081d] text-[#31081d] group-hover:text-white flex items-center justify-center transition-colors mb-1.5 shadow-2xs">
              <PlusCircle className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-[#31081d] text-center">نوبت جدید</span>
          </button>

          <button
            id="btn-quick-new-cust"
            onClick={onOpenNewCustomer}
            className="flex flex-col items-center p-2.5 bg-[#FDFCFB] rounded-2xl border border-[#d4c2c7]/40 hover:border-[#31081d]/30 hover:shadow-xs transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#f6ebed] group-hover:bg-[#31081d] text-[#7c5357] group-hover:text-white flex items-center justify-center transition-colors mb-1.5 shadow-2xs">
              <UserPlus className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-[#31081d] text-center">مشتری جدید</span>
          </button>

          <button
            id="btn-quick-services"
            onClick={() => onNavigate('services')}
            className="flex flex-col items-center p-2.5 bg-[#FDFCFB] rounded-2xl border border-[#d4c2c7]/40 hover:border-[#31081d]/30 hover:shadow-xs transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#f6ebed] group-hover:bg-[#31081d] text-[#7c5357] group-hover:text-white flex items-center justify-center transition-colors mb-1.5 shadow-2xs">
              <Scissors className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-[#31081d] text-center">لیست خدمات</span>
          </button>

          <button
            id="btn-quick-reports"
            onClick={() => onNavigate('reports')}
            className="flex flex-col items-center p-2.5 bg-[#FDFCFB] rounded-2xl border border-[#d4c2c7]/40 hover:border-[#31081d]/30 hover:shadow-xs transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#f6ebed] group-hover:bg-[#31081d] text-[#7c5357] group-hover:text-white flex items-center justify-center transition-colors mb-1.5 shadow-2xs">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-[#31081d] text-center">گزارش مالی</span>
          </button>
        </div>
      </div>

      {/* Upcoming Appointments List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#31081d] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#7c5357]" />
            <span>نوبت‌های پیش‌رو و تایید درخواست‌ها</span>
          </h2>
          <button
            onClick={() => onNavigate('appointments')}
            className="text-xs text-[#31081d] hover:underline font-bold flex items-center gap-0.5"
          >
            <span>مشاهده همه</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {appointments.slice(0, 3).map((apt) => (
            <div
              key={apt.id}
              className="bg-[#FDFCFB] p-3.5 rounded-2xl border border-[#d4c2c7]/40 shadow-xs hover:border-[#31081d]/30 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#f6ebed] text-[#31081d] font-bold text-xs flex items-center justify-center">
                    {apt.customerName.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#31081d]">{apt.customerName}</h3>
                    <p className="text-[11px] text-[#504348]">{apt.serviceName}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    apt.status === 'NEW'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200 animate-pulse'
                      : apt.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : apt.status === 'DONE'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {apt.status === 'NEW' && 'درخواست جدید'}
                  {apt.status === 'CONFIRMED' && 'تایید شده ✓'}
                  {apt.status === 'DONE' && 'انجام شده'}
                  {apt.status === 'CANCELLED' && 'لغو شده'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#504348] py-1.5 border-y border-[#d4c2c7]/20">
                <div className="flex items-center gap-1 text-[#31081d] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#7c5357]" />
                  <span>{apt.dateShamsi} • ساعت {apt.time} ({apt.durationMinutes} دقیقه)</span>
                </div>
                <div className="font-bold text-[#D4AF37]">
                  {formatPrice(apt.price)} ت
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 mt-2 pt-1">
                <a
                  href={`tel:${apt.customerPhone}`}
                  className="p-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                  title="تماس تلفنی با مشتری"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {apt.status === 'NEW' && (
                  <>
                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="px-2.5 py-1 rounded-full bg-[#f6ebed] hover:bg-[#ebe0e2] text-red-700 text-xs font-semibold transition active:scale-95"
                    >
                      رد نوبت
                    </button>
                    <button
                      onClick={() => setConfirmModalApt(apt)}
                      className="px-3.5 py-1 rounded-full bg-[#31081d] hover:bg-[#4a1d32] text-white text-xs font-bold shadow-xs transition flex items-center gap-1 active:scale-95"
                    >
                      <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>تایید و قبول نوبت</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation & Notification Modal */}
      <ConfirmAppointmentModal
        appointment={confirmModalApt}
        isOpen={!!confirmModalApt}
        onClose={() => setConfirmModalApt(null)}
        onConfirmWithNotification={(id, customSms) => {
          onConfirmAppointment(id, customSms);
          setConfirmModalApt(null);
        }}
      />

    </div>
  );
};
