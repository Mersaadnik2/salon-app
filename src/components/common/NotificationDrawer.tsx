import React, { useState } from 'react';
import { AppNotification } from '../../types';
import { 
  Bell, 
  X, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Trash2, 
  Sparkles,
  ShieldCheck,
  Send,
  Smartphone
} from 'lucide-react';
import { playNotificationChime } from '../../utils/notificationSound';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onClearNotifications: () => void;
  onSelectNotification?: (notification: AppNotification) => void;
  onTriggerTestNotification: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onClearNotifications,
  onSelectNotification,
  onTriggerTestNotification,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'CONFIRMATION' | 'SMS'>('ALL');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'CONFIRMATION') return n.type === 'CONFIRMATION';
    if (filter === 'SMS') return n.type === 'SMS_SENT' || !!n.smsPreview;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF7F5] h-full shadow-2xl flex flex-col text-[#1f1a1c] animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="bg-[#31081d] text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">مرکز اعلان‌ها و نوتیفیکیشن‌ها</h3>
              <p className="text-[11px] text-pink-200/80">{notifications.length} اعلان ثبت شده در سامانه</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills & Test Trigger Button */}
        <div className="p-3 bg-[#f6ebed] border-b border-[#d4c2c7]/40 flex items-center justify-between gap-2">
          <div className="flex gap-1.5 text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 rounded-full font-bold transition ${
                filter === 'ALL'
                  ? 'bg-[#31081d] text-white shadow-2xs'
                  : 'bg-white text-[#504348] hover:bg-gray-100'
              }`}
            >
              همه ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('CONFIRMATION')}
              className={`px-3 py-1 rounded-full font-bold transition ${
                filter === 'CONFIRMATION'
                  ? 'bg-[#31081d] text-white shadow-2xs'
                  : 'bg-white text-[#504348] hover:bg-gray-100'
              }`}
            >
              تایید نوبت‌ها
            </button>
            <button
              onClick={() => setFilter('SMS')}
              className={`px-3 py-1 rounded-full font-bold transition ${
                filter === 'SMS'
                  ? 'bg-[#31081d] text-white shadow-2xs'
                  : 'bg-white text-[#504348] hover:bg-gray-100'
              }`}
            >
              پیامک‌ها
            </button>
          </div>

          <button
            onClick={() => {
              playNotificationChime('confirm');
              onTriggerTestNotification();
            }}
            className="text-[11px] font-bold text-[#31081d] bg-white hover:bg-[#ebe0e2] px-2.5 py-1 rounded-full border border-[#d4c2c7] transition active:scale-95 flex items-center gap-1 shadow-2xs"
            title="تست صدای زنگ و اعلان"
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>تست زنگ</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-[#FDFCFB] rounded-2xl border border-dashed border-[#d4c2c7] p-6">
              <Bell className="w-10 h-10 text-[#7c5357] mx-auto mb-2 opacity-40" />
              <p className="text-xs font-bold text-[#31081d]">هیچ اعلانی در این دسته وجود ندارد</p>
              <p className="text-[11px] text-[#504348] mt-1">با تایید نوبت یا رزرو جدید، نوتیفیکیشن‌ها اینجا نمایش داده می‌شوند.</p>
              <button
                onClick={() => {
                  playNotificationChime('confirm');
                  onTriggerTestNotification();
                }}
                className="mt-4 px-4 py-2 rounded-full bg-[#31081d] text-white text-xs font-bold shadow-xs active:scale-95"
              >
                ایجاد یک اعلان آزمایشی
              </button>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onSelectNotification && onSelectNotification(notif)}
                className="bg-[#FDFCFB] rounded-2xl p-3.5 border border-[#d4c2c7]/40 shadow-xs hover:border-[#31081d]/30 transition space-y-2 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#f6ebed] text-[#31081d] flex items-center justify-center shrink-0">
                      {notif.type === 'CONFIRMATION' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : notif.type === 'SMS_SENT' ? (
                        <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                      ) : (
                        <Bell className="w-4 h-4 text-[#7c5357]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#31081d]">{notif.title}</h4>
                      <span className="text-[10px] text-[#504348] flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{notif.timestamp}</span>
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[#2D6A4F]">
                    تحویل شد
                  </span>
                </div>

                <p className="text-xs text-[#504348] leading-relaxed">
                  {notif.message}
                </p>

                {notif.smsPreview && (
                  <div className="bg-[#f6ebed] rounded-xl p-2.5 border border-[#d4c2c7]/30 text-[11px] text-[#31081d] font-mono flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-[10px] font-sans font-bold text-[#7c5357] block mb-0.5">متن پیامک ارسالی:</span>
                      <p className="line-clamp-3">{notif.smsPreview}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer with Clear All */}
        {notifications.length > 0 && (
          <div className="p-3 bg-white border-t border-gray-200 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-[#504348]">وضعیت سرور نوتیفیکیشن: متصل</span>
            <button
              onClick={onClearNotifications}
              className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 p-1 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>پاکسازی همه اعلان‌ها</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
