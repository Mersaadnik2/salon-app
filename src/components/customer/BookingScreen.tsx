import React, { useState } from 'react';
import { Salon, BeautyService, BookingStep, Appointment } from '../../types';
import { formatPrice } from '../../data/initialData';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ChevronRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Tag
} from 'lucide-react';

interface BookingScreenProps {
  salon: Salon;
  existingAppointments: Appointment[];
  onBack: () => void;
  onBookingComplete: (newAppointment: Omit<Appointment, 'id'>) => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  salon,
  existingAppointments,
  onBack,
  onBookingComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('SELECT_SERVICE');
  const [selectedService, setSelectedService] = useState<BeautyService | null>(salon.services[0] || null);
  const [selectedDate, setSelectedDate] = useState<string>('امروز (۲۰ مرداد)');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [customerName] = useState('سارا احمدی');
  const [customerPhone] = useState('09123456789');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const availableDates = [
    'امروز (۲۰ مرداد)',
    'فردا (۲۱ مرداد)',
    'دوشنبه (۲۲ مرداد)',
    'سه‌شنبه (۲۳ مرداد)',
    'چهارشنبه (۲۴ مرداد)',
  ];

  const timeSlots = [
    '09:30', '10:30', '11:30', '12:30', '14:00', '15:30', '16:30', '18:00', '19:00'
  ];

  // Helper check for availability logic
  const isTimeOccupied = (time: string) => {
    return existingAppointments.some(
      (apt) =>
        apt.dateShamsi === selectedDate &&
        apt.time === time &&
        apt.status !== 'CANCELLED'
    );
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'ZIBANO_FIRST' || couponCode.toUpperCase() === 'ZIBANO') {
      setDiscountPercent(20);
    } else {
      setDiscountPercent(0);
    }
  };

  const handleFinalSubmit = () => {
    if (!selectedService) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const finalPrice = discountPercent > 0 
      ? selectedService.price * (1 - discountPercent / 100) 
      : selectedService.price;

    onBookingComplete({
      customerName,
      customerPhone,
      serviceName: selectedService.name,
      serviceId: selectedService.id,
      dateShamsi: selectedDate,
      time: selectedTime,
      durationMinutes: selectedService.durationMinutes,
      price: finalPrice,
      status: 'NEW',
      notes: 'رزرو آنلاین از طریق زیبانو',
      salonId: salon.id,
    });
  };

  // Step Progress Calculation
  const progressPercent = {
    SELECT_SERVICE: 25,
    SELECT_DATE: 50,
    SELECT_TIME: 75,
    CONFIRMATION: 100,
  }[currentStep];

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-5 bg-[#fff8f8] text-[#1f1a1c] flex flex-col justify-between min-h-screen">
      
      {/* Step Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (currentStep === 'SELECT_SERVICE') onBack();
              if (currentStep === 'SELECT_DATE') setCurrentStep('SELECT_SERVICE');
              if (currentStep === 'SELECT_TIME') setCurrentStep('SELECT_DATE');
              if (currentStep === 'CONFIRMATION') setCurrentStep('SELECT_TIME');
            }}
            className="p-2 rounded-full bg-[#f6ebed] text-[#31081d] hover:bg-[#ebe0e2] transition active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-[#31081d]">رزرو نوبت در {salon.name}</h1>
            <p className="text-xs text-[#504348]">انتخاب زمان و تایید نهایی</p>
          </div>
        </div>

        {/* Linear Progress Indicator */}
        <div className="w-full bg-[#f6ebed] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#31081d] to-[#D4AF37] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* STEP 1: SELECT SERVICE */}
      {currentStep === 'SELECT_SERVICE' && (
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-sm font-bold text-[#31081d]">چه خدمتی مد نظر شماست؟</h2>
            <p className="text-xs text-[#504348]">یکی از خدمات سالن را جهت رزرو انتخاب نمایید</p>
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-0.5 no-scrollbar">
            {salon.services.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  setCurrentStep('SELECT_DATE');
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedService?.id === service.id
                    ? 'border-[#31081d] bg-[#f6ebed] shadow-xs'
                    : 'border-[#d4c2c7]/40 bg-[#FDFCFB] hover:border-[#31081d]/30'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#31081d]">{service.name}</h3>
                    {selectedService?.id === service.id && (
                      <span className="w-4 h-4 rounded-full bg-[#31081d] text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#504348] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#7c5357]" />
                    <span>{service.durationMinutes} دقیقه</span>
                  </p>
                </div>

                <div className="text-left">
                  <div className="font-bold text-sm text-[#D4AF37]">
                    {formatPrice(service.price)}
                  </div>
                  <span className="text-[10px] text-[#504348]">تومان</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: SELECT DATE */}
      {currentStep === 'SELECT_DATE' && (
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-sm font-bold text-[#31081d]">چه روزی را ترجیح می‌دهید؟</h2>
            <p className="text-xs text-[#504348]">تاریخ مراجعه به سالن را انتخاب کنید</p>
          </div>

          <div className="space-y-2.5">
            {availableDates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                  selectedDate === date
                    ? 'border-[#31081d] bg-[#f6ebed] shadow-xs'
                    : 'border-[#d4c2c7]/40 bg-[#FDFCFB] hover:border-[#31081d]/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${selectedDate === date ? 'bg-[#31081d] text-white' : 'bg-[#f6ebed] text-[#504348]'}`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-[#31081d]">{date}</span>
                </div>

                {selectedDate === date && (
                  <span className="w-5 h-5 rounded-full bg-[#31081d] text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: SELECT TIME SLOT */}
      {currentStep === 'SELECT_TIME' && (
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-sm font-bold text-[#31081d]">ساعت مراجعه را انتخاب کنید</h2>
            <p className="text-xs text-[#504348]">تاریخ: <span className="font-bold text-[#31081d]">{selectedDate}</span></p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {timeSlots.map((time) => {
              const occupied = isTimeOccupied(time);
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  disabled={occupied}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
                    occupied
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-[#31081d] text-white shadow-md ring-2 ring-[#31081d]/30'
                      : 'bg-[#FDFCFB] text-[#31081d] border border-[#d4c2c7]/40 hover:border-[#31081d]/30'
                  }`}
                >
                  <span className="font-mono text-sm">{time}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    {occupied ? 'رزرو شده' : 'آزاد'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs text-[#504348] pt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#31081d]"></span>
              <span>انتخاب شما</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white border border-gray-300"></span>
              <span>زمان آزاد</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gray-200"></span>
              <span>تکمیل شده</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: FINAL CONFIRMATION */}
      {currentStep === 'CONFIRMATION' && (
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-sm font-bold text-[#31081d]">تایید نهایی و ثبت نوبت</h2>
            <p className="text-xs text-[#504348]">جزئیات رزرو را بررسی و تایید نمایید</p>
          </div>

          <div className="bg-[#FDFCFB] rounded-2xl p-4 border border-[#d4c2c7]/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#d4c2c7]/20">
              <h3 className="font-bold text-sm text-[#31081d]">{salon.name}</h3>
              <span className="text-xs text-[#7c5357] font-semibold">{salon.area}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#504348]">خدمت درخواستی:</span>
                <span className="font-bold text-[#31081d]">{selectedService?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#504348]">تاریخ مراجعه:</span>
                <span className="font-bold text-[#31081d]">{selectedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#504348]">ساعت و مدت زمان:</span>
                <span className="font-bold text-[#31081d]">ساعت {selectedTime} ({selectedService?.durationMinutes} دقیقه)</span>
              </div>

              <div className="pt-2 border-t border-[#d4c2c7]/20 flex items-center justify-between">
                <span className="text-[#504348]">مبلغ پایه خدمت:</span>
                <span className="font-bold text-[#31081d]">{formatPrice(selectedService?.price || 0)} تومان</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>تخفیف ({discountPercent}٪):</span>
                  <span>- {formatPrice((selectedService?.price || 0) * (discountPercent / 100))} تومان</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#d4c2c7]/20 flex items-center justify-between text-sm">
                <span className="font-bold text-[#31081d]">مبلغ نهایی قابل پرداخت:</span>
                <span className="font-bold text-[#D4AF37] text-base">
                  {formatPrice(
                    discountPercent > 0 
                      ? (selectedService?.price || 0) * (1 - discountPercent / 100) 
                      : (selectedService?.price || 0)
                  )} تومان
                </span>
              </div>
            </div>
          </div>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="کد تخفیف (مثال: ZIBANO)"
              className="flex-1 px-3 py-2.5 bg-[#FDFCFB] rounded-full border border-[#d4c2c7]/60 text-xs uppercase outline-none focus:border-[#31081d]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#31081d] hover:bg-[#4a1d32] text-white text-xs font-bold rounded-full transition active:scale-95 shadow-xs"
            >
              اعمال کد
            </button>
          </form>
        </div>
      )}

      {/* Step Navigation Next Button */}
      <div className="pt-3">
        {currentStep === 'SELECT_SERVICE' && (
          <button
            onClick={() => setCurrentStep('SELECT_DATE')}
            className="w-full py-3.5 rounded-full bg-[#31081d] hover:bg-[#4a1d32] text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            انتخاب تاریخ مراجعه
          </button>
        )}

        {currentStep === 'SELECT_DATE' && (
          <button
            onClick={() => setCurrentStep('SELECT_TIME')}
            className="w-full py-3.5 rounded-full bg-[#31081d] hover:bg-[#4a1d32] text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            تایید و انتخاب ساعت
          </button>
        )}

        {currentStep === 'SELECT_TIME' && (
          <button
            onClick={() => setCurrentStep('CONFIRMATION')}
            className="w-full py-3.5 rounded-full bg-[#31081d] hover:bg-[#4a1d32] text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            مرحله بعد: تایید نهایی
          </button>
        )}

        {currentStep === 'CONFIRMATION' && (
          <button
            onClick={handleFinalSubmit}
            className="w-full py-3.5 rounded-full bg-[#31081d] hover:bg-[#4a1d32] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
          >
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span>ثبت قطعی نوبت در سالن</span>
          </button>
        )}
      </div>

    </div>
  );
};

