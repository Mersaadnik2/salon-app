import React, { useState } from 'react';
import { Appointment } from '../../types';
import { formatPrice } from '../../data/initialData';
import { 
  CheckCircle2, 
  X, 
  MessageSquare, 
  Bell, 
  Clock, 
  Calendar, 
  Sparkles, 
  Send,
  User,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ConfirmAppointmentModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmWithNotification: (appointmentId: string, customSmsText?: string) => void;
}

export const ConfirmAppointmentModal: React.FC<ConfirmAppointmentModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onConfirmWithNotification,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [sendSms, setSendSms] = useState(true);
  const [sendPush, setSendPush] = useState(true);

  if (!isOpen || !appointment) return null;

  const templates = [
    {
      id: 0,
      title: 'پیامک تایید استاندارد',
      text: `سلام ${appointment.customerName} عزیز، نوبت شما برای «${appointment.serviceName}» در سالن زیبایی مریم برای تاریخ ${appointment.dateShamsi} ساعت ${appointment.time} با موفقیت تایید گردید. منتظر حضور گرمتان هستیم.`
    },
    {
      id: 1,
      title: 'پیامک تایید همراه با آدرس و لوکیشن',
      text: `سلام ${appointment.customerName} گرامی، نوبت شما در سالن مریم برای ${appointment.dateShamsi} ساعت ${appointment.time} تایید شد. آدرس: تهران، خیابان فرشته، پلاک ۱۲. لطفا ۱۰ دقیقه قبل حضور داشته باشید.`
    },
    {
      id: 2,
      title: 'پیامک تایید VIP با تشریفات',
      text: `مشتری VIP سالن مریم، خانم ${appointment.customerName} عزیز، زمان اختصاصی شما برای ${appointment.serviceName} در تاریخ ${appointment.dateShamsi} ساعت ${appointment.time} رزرو و تایید قطعی شد.`
    }
  ];

  const currentSmsText = templates[selectedTemplate].text;

  const handleConfirm = () => {
    onConfirmWithNotification(appointment.id, sendSms ? currentSmsText : undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F5] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-200 text-[#1f1a1c] max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#31081d] to-[#4a1d32] text-white p-4.5 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">تایید و قبول نوبت مشتری</h3>
              <p className="text-xs text-pink-100/80">ارسال همزمان نوتیفیکیشن اختصاصی و پیامک</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* Appointment Summary Box */}
          <div className="bg-[#FDFCFB] rounded-2xl p-4 border border-[#d4c2c7]/40 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#d4c2c7]/20">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#7c5357]" />
                <span className="font-bold text-sm text-[#31081d]">{appointment.customerName}</span>
              </div>
              <span className="text-xs font-mono text-[#504348]" dir="ltr">{appointment.customerPhone}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#504348] block text-[11px]">خدمت درخواستی:</span>
                <span className="font-bold text-[#31081d]">{appointment.serviceName}</span>
              </div>
              <div>
                <span className="text-[#504348] block text-[11px]">زمان مراجعه:</span>
                <span className="font-bold text-[#31081d]">{appointment.dateShamsi} • {appointment.time}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#d4c2c7]/20 flex items-center justify-between text-xs">
              <span className="text-[#504348]">مبلغ خدمت:</span>
              <span className="font-bold text-[#D4AF37] text-sm">{formatPrice(appointment.price)} تومان</span>
            </div>
          </div>

          {/* Notification Options Toggles */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#31081d] flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>تنظیمات نوتیفیکیشن و اطلاع‌رسانی</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSendPush(!sendPush)}
                className={`p-3 rounded-xl border text-right transition flex items-center justify-between ${
                  sendPush ? 'border-[#31081d] bg-[#f6ebed]' : 'border-gray-200 bg-white opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#31081d]">
                  <Bell className="w-4 h-4 text-[#7c5357]" />
                  <span>اعلان درون‌برنامه‌ای</span>
                </div>
                {sendPush && <Check className="w-4 h-4 text-[#31081d]" />}
              </button>

              <button
                type="button"
                onClick={() => setSendSms(!sendSms)}
                className={`p-3 rounded-xl border text-right transition flex items-center justify-between ${
                  sendSms ? 'border-[#31081d] bg-[#f6ebed]' : 'border-gray-200 bg-white opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#31081d]">
                  <MessageSquare className="w-4 h-4 text-[#7c5357]" />
                  <span>پیامک SMS خودکار</span>
                </div>
                {sendSms && <Check className="w-4 h-4 text-[#31081d]" />}
              </button>
            </div>
          </div>

          {/* SMS Templates Selection */}
          {sendSms && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#31081d] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>انتخاب الگوی پیامک ارسالی به مشتری:</span>
                </label>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  سرشماره پیامکی اختصاصی
                </span>
              </div>

              <div className="flex gap-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold border transition ${
                      selectedTemplate === tpl.id
                        ? 'border-[#31081d] bg-[#31081d] text-white shadow-2xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tpl.title.replace('پیامک تایید ', '')}
                  </button>
                ))}
              </div>

              {/* SMS Text Preview Box */}
              <div className="bg-[#f6ebed] rounded-xl p-3 border border-[#d4c2c7]/40 text-xs text-[#504348] relative">
                <span className="text-[10px] font-bold text-[#31081d] block mb-1">پیش‌نمایش پیامک تحویلی:</span>
                <p className="leading-relaxed whitespace-pre-wrap">{currentSmsText}</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-full border border-[#d4c2c7] text-[#504348] text-xs font-bold hover:bg-gray-50 transition active:scale-95"
          >
            انصراف
          </button>
          
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-full bg-[#31081d] hover:bg-[#4a1d32] text-white text-xs font-bold shadow-md shadow-[#31081d]/20 transition flex items-center justify-center gap-2 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>تایید و قبول نوبت (همراه نوتیفیکیشن)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
