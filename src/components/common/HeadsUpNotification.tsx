import React, { useEffect, useState } from 'react';
import { AppNotification } from '../../types';
import { 
  Bell, 
  CheckCircle2, 
  MessageSquare, 
  X, 
  ChevronLeft, 
  Sparkles, 
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  Send
} from 'lucide-react';

interface HeadsUpNotificationProps {
  notification: AppNotification | null;
  onDismiss: () => void;
  onViewAppointment?: (id: string) => void;
  onOpenNotificationCenter?: () => void;
}

export const HeadsUpNotification: React.FC<HeadsUpNotificationProps> = ({
  notification,
  onDismiss,
  onViewAppointment,
  onOpenNotificationCenter,
}) => {
  const [isShowingSms, setIsShowingSms] = useState(false);

  useEffect(() => {
    if (!notification) return;
    setIsShowingSms(false);

    const timer = setTimeout(() => {
      onDismiss();
    }, 7000);

    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  return (
    <div className="fixed top-2 sm:top-4 inset-x-3 sm:inset-x-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-top-4 duration-300">
      {/* Android Heads-Up Notification Card */}
      <div className="bg-[#230614] text-white rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-[#d4c2c7]/20 backdrop-blur-xl relative overflow-hidden ring-1 ring-white/10">
        
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header bar of the notification */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#D4AF37] text-[#230614] flex items-center justify-center font-bold text-[10px] shadow-xs">
              زی
            </div>
            <span className="font-bold text-gray-200 tracking-tight">Zibano • سیستم نوتیفیکیشن هوشمند</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-400">
            <span>{notification.timestamp}</span>
            <button 
              onClick={onDismiss}
              className="p-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition"
              title="بستن اعلان"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notification Main Body */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            {notification.type === 'CONFIRMATION' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : notification.type === 'SMS_SENT' ? (
              <MessageSquare className="w-5 h-5" />
            ) : (
              <Bell className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-white">{notification.title}</h4>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                تایید شد ✓
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {notification.message}
            </p>

            {notification.smsPreview && (
              <div className="mt-2.5 p-2.5 bg-black/40 rounded-xl border border-white/10 text-[11px] text-amber-200/90 font-mono flex items-start gap-2">
                <MessageSquare className="w-3.5 h-3.5 shrink-0 text-[#D4AF37] mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-gray-400 mb-0.5 font-sans">
                    <span>پیامک ارسال شده به مشتری:</span>
                    <span className="text-emerald-400">تحویل شده (دلیوری ۱۰۰٪)</span>
                  </div>
                  <p className="line-clamp-2 leading-tight">{notification.smsPreview}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-white/10">
          {notification.appointmentId && onViewAppointment && (
            <button
              onClick={() => {
                onViewAppointment(notification.appointmentId!);
                onDismiss();
              }}
              className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c49f2e] text-[#230614] font-bold text-xs transition active:scale-95 flex items-center gap-1 shadow-xs"
            >
              <span>مشاهده نوبت</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenNotificationCenter && (
            <button
              onClick={() => {
                onOpenNotificationCenter();
                onDismiss();
              }}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 font-medium text-xs transition active:scale-95"
            >
              مرکز اعلان‌ها
            </button>
          )}

          <button
            onClick={onDismiss}
            className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-white transition"
          >
            متوجه شدم
          </button>
        </div>

      </div>
    </div>
  );
};
