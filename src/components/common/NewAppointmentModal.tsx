import React, { useState } from 'react';
import { Appointment, BeautyService } from '../../types';
import { X, Calendar, Clock, User, Phone, Plus, AlertCircle } from 'lucide-react';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: BeautyService[];
  existingAppointments: Appointment[];
  onAddAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  services,
  existingAppointments,
  onAddAppointment,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('0912');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '1');
  const [dateShamsi, setDateShamsi] = useState('امروز (۲۰ مرداد)');
  const [time, setTime] = useState('11:00');
  const [notes, setNotes] = useState('');
  const [hasConflict, setHasConflict] = useState(false);

  if (!isOpen) return null;

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    // Check conflict
    const conflict = existingAppointments.some(
      a => a.dateShamsi === dateShamsi && a.time === newTime && a.status !== 'CANCELLED'
    );
    setHasConflict(conflict);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const chosenService = services.find(s => s.id === selectedServiceId) || services[0];

    onAddAppointment({
      customerName,
      customerPhone,
      serviceName: chosenService?.name || 'خدمت زیبایی',
      serviceId: chosenService?.id,
      dateShamsi,
      time,
      durationMinutes: chosenService?.durationMinutes || 60,
      price: chosenService?.price || 500000,
      status: 'CONFIRMED',
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 border border-[#B76E79]/20 text-[#333333]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-50 text-[#B76E79]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900">ثبت نوبت دستی / تلفنی</h3>
              <p className="text-[11px] text-gray-500">رزرو سریع نوبت برای مشتری حضوری یا تلفنی</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-gray-700 mb-1">نام و نام خانوادگی مشتری</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="مثلاً نگار محمدی"
              required
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">شماره تماس</label>
            <input
              type="tel"
              dir="ltr"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="09120000000"
              required
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none font-mono text-left"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">انتخاب خدمت</label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none bg-white font-medium"
            >
              {services.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.durationMinutes} دقیقه)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">تاریخ نوبت</label>
              <select
                value={dateShamsi}
                onChange={(e) => setDateShamsi(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none bg-white"
              >
                <option value="امروز (۲۰ مرداد)">امروز (۲۰ مرداد)</option>
                <option value="فردا (۲۱ مرداد)">فردا (۲۱ مرداد)</option>
                <option value="دوشنبه (۲۲ مرداد)">دوشنبه (۲۲ مرداد)</option>
                <option value="سه‌شنبه (۲۳ مرداد)">سه‌شنبه (۲۳ مرداد)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">ساعت مراجعه</label>
              <select
                value={time}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none bg-white font-mono"
              >
                <option value="09:30">09:30</option>
                <option value="11:00">11:00</option>
                <option value="12:30">12:30</option>
                <option value="14:00">14:00</option>
                <option value="15:30">15:30</option>
                <option value="17:00">17:00</option>
                <option value="18:30">18:30</option>
              </select>
            </div>
          </div>

          {hasConflict && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>هشدار تداخل زمانی: در این ساعت نوبت دیگری از قبل ثبت شده است.</span>
            </div>
          )}

          <div>
            <label className="block font-medium text-gray-700 mb-1">یادداشت تکمیلی</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثلاً رنگ پایه، ترجیح پرسنل..."
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
            />
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
              ثبت قطعی نوبت
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
