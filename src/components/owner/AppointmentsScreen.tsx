import React, { useState } from 'react';
import { Appointment } from '../../types';
import { formatPrice } from '../../data/initialData';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Phone, 
  Check, 
  X, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Filter,
  User,
  Bell,
  Sparkles
} from 'lucide-react';
import { ConfirmAppointmentModal } from './ConfirmAppointmentModal';

interface AppointmentsScreenProps {
  appointments: Appointment[];
  onOpenNewAppointment: () => void;
  onConfirmAppointment: (id: string, customSmsText?: string) => void;
  onDoneAppointment: (id: string) => void;
  onCancelAppointment: (id: string) => void;
}

export const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({
  appointments,
  onOpenNewAppointment,
  onConfirmAppointment,
  onDoneAppointment,
  onCancelAppointment,
}) => {
  const [selectedTab, setSelectedTab] = useState<'today' | 'tomorrow' | 'week' | 'all'>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmModalApt, setConfirmModalApt] = useState<Appointment | null>(null);

  const tabs = [
    { id: 'today', title: 'امروز' },
    { id: 'tomorrow', title: 'فردا' },
    { id: 'week', title: 'این هفته' },
    { id: 'all', title: 'همه نوبت‌ها' },
  ] as const;

  const filteredAppointments = appointments.filter((apt) => {
    // Search query filter
    const matchesSearch = 
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.customerPhone.includes(searchQuery) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Tab filter
    if (selectedTab === 'today') return apt.dateShamsi.includes('امروز') || apt.dateShamsi.includes('۲۰ مرداد');
    if (selectedTab === 'tomorrow') return apt.dateShamsi.includes('فردا') || apt.dateShamsi.includes('۲۱ مرداد');
    if (selectedTab === 'week') return !apt.dateShamsi.includes('ماه بعد');
    return true;
  });

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-5 bg-[#fff8f8] text-[#1f1a1c]">
      
      {/* Header with Title and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#31081d] flex items-center gap-2">
            <span>مدیریت نوبت‌ها</span>
            <span className="text-xl">📅</span>
          </h1>
          <p className="text-xs text-[#504348] mt-0.5">تقویم کاری، تایید و قبول نوبت‌های مشتریان با نوتیفیکیشن</p>
        </div>

        <button
          id="btn-add-appointment-top"
          onClick={onOpenNewAppointment}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#31081d] hover:bg-[#4a1d32] text-white text-xs font-bold shadow-xs transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>ثبت نوبت دستی</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#f6ebed] p-1 rounded-full border border-[#d4c2c7]/40 shadow-2xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all text-center ${
              selectedTab === tab.id
                ? 'bg-[#31081d] text-white shadow-xs'
                : 'text-[#504348] hover:text-[#31081d]'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو با نام مشتری، شماره تلفن یا نام خدمت..."
          className="w-full pl-3 pr-9 py-2.5 bg-[#FDFCFB] rounded-full border border-[#d4c2c7]/60 focus:border-[#31081d] text-xs outline-none transition"
        />
        <Search className="w-4 h-4 text-[#7c5357] absolute right-3 top-3 pointer-events-none" />
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12 bg-[#FDFCFB] rounded-2xl border border-dashed border-[#d4c2c7] p-6">
            <div className="w-12 h-12 rounded-full bg-[#f6ebed] text-[#31081d] flex items-center justify-center mx-auto mb-3">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-[#31081d]">نوبتی در این بازه زمانی یافت نشد</h3>
            <p className="text-xs text-[#504348] mt-1">می‌توانید برای این تاریخ نوبت جدید ثبت کنید</p>
            <button
              onClick={onOpenNewAppointment}
              className="mt-4 px-4 py-2 rounded-full bg-[#31081d] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت نوبت جدید</span>
            </button>
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-[#FDFCFB] rounded-2xl p-4 border border-[#d4c2c7]/40 shadow-xs hover:border-[#31081d]/30 transition space-y-3"
            >
              {/* Card Top: Customer Name & Status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#f6ebed] text-[#31081d] font-bold text-sm flex items-center justify-center shadow-2xs">
                    {apt.customerName.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#31081d]">{apt.customerName}</h3>
                    <span className="text-[11px] text-[#504348] font-mono" dir="ltr">{apt.customerPhone}</span>
                  </div>
                </div>

                {/* Status Pill */}
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    apt.status === 'NEW'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200 animate-pulse'
                      : apt.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : apt.status === 'DONE'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {apt.status === 'NEW' && 'درخواست جدید'}
                  {apt.status === 'CONFIRMED' && 'تایید شده ✓'}
                  {apt.status === 'DONE' && 'انجام شد'}
                  {apt.status === 'CANCELLED' && 'لغو گردید'}
                </span>
              </div>

              {/* Service & Time Info */}
              <div className="bg-[#f6ebed] rounded-xl p-3 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#504348]">خدمت درخواستی:</span>
                  <span className="font-bold text-[#31081d]">{apt.serviceName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#504348]">زمان مراجعه:</span>
                  <span className="font-medium text-[#31081d] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7c5357]" />
                    <span>{apt.dateShamsi} • ساعت {apt.time} ({apt.durationMinutes} دقیقه)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#d4c2c7]/30">
                  <span className="text-[#504348]">مبلغ خدمت:</span>
                  <span className="font-bold text-[#D4AF37] text-sm">
                    {formatPrice(apt.price)} تومان
                  </span>
                </div>

                {apt.notes && (
                  <div className="pt-1 text-[11px] text-[#504348] border-t border-[#d4c2c7]/30">
                    <span className="font-semibold text-[#31081d]">یادداشت: </span>
                    <span>{apt.notes}</span>
                  </div>
                )}
              </div>

              {/* Card Actions Footer */}
              <div className="flex items-center justify-between pt-1">
                <a
                  href={`tel:${apt.customerPhone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>تماس</span>
                </a>

                <div className="flex items-center gap-2">
                  {apt.status === 'NEW' && (
                    <>
                      <button
                        onClick={() => onCancelAppointment(apt.id)}
                        className="px-3 py-1.5 rounded-full bg-[#f6ebed] hover:bg-[#ebe0e2] text-red-700 text-xs font-semibold transition active:scale-95"
                      >
                        رد نوبت
                      </button>
                      <button
                        onClick={() => setConfirmModalApt(apt)}
                        className="px-3.5 py-1.5 rounded-full bg-[#31081d] hover:bg-[#4a1d32] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 active:scale-95"
                      >
                        <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>تایید و قبول نوبت</span>
                      </button>
                    </>
                  )}

                  {apt.status === 'CONFIRMED' && (
                    <>
                      <button
                        onClick={() => onCancelAppointment(apt.id)}
                        className="px-3 py-1.5 rounded-full bg-[#f6ebed] hover:bg-[#ebe0e2] text-[#504348] text-xs transition active:scale-95"
                      >
                        لغو
                      </button>
                      <button
                        onClick={() => onDoneAppointment(apt.id)}
                        className="px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition flex items-center gap-1 active:scale-95"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>ثبت انجام خدمت</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
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
