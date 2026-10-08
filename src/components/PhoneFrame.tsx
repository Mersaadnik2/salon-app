import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Sparkles, Download, Smartphone, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  isSimulatorMode: boolean;
  onToggleSimulator: () => void;
  onOpenApkModal: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isSimulatorMode,
  onToggleSimulator,
  onOpenApkModal,
}) => {
  const [time, setTime] = useState('14:30');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isSimulatorMode) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] flex flex-col">
        {/* Desktop Top Control Bar */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#B76E79]/20 px-4 py-3 shadow-xs">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#B76E79] to-[#D4AF37] flex items-center justify-center text-white font-bold shadow-sm">
                زی
              </div>
              <div>
                <h1 className="font-bold text-base text-[#333333] flex items-center gap-2">
                  <span>زیبانو</span>
                  <span className="text-xs bg-[#B76E79]/10 text-[#B76E79] px-2 py-0.5 rounded-full font-medium">نسخه اندروید ۱.۰.۰</span>
                </h1>
                <p className="text-xs text-gray-500">پلتفرم هوشمند مدیریت سالن و نوبت‌دهی (Jetpack Compose)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-switch-simulator"
                onClick={onToggleSimulator}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs text-gray-700 font-medium transition-colors"
                title="مشاهده در قاب گوشی اندروید"
              >
                <Smartphone className="w-4 h-4 text-[#B76E79]" />
                <span className="hidden sm:inline">قاب شبیه‌ساز اندروید</span>
              </button>

              <button
                id="btn-open-apk-guide"
                onClick={onOpenApkModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#B76E79] to-[#9E535E] hover:opacity-95 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>دریافت و ساخت APK</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-2 sm:p-6 select-none">
      {/* Top Controls for Device Mockup */}
      <div className="w-full max-w-sm mb-3 flex items-center justify-between text-xs text-slate-300 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">شبیه‌ساز زنده اندروید</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-open-apk-modal-sim"
            onClick={onOpenApkModal}
            className="flex items-center gap-1 bg-[#B76E79] hover:bg-[#a05863] text-white px-2.5 py-1 rounded-md text-[11px] font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>خروجی APK</span>
          </button>

          <button
            id="btn-toggle-fullscreen"
            onClick={onToggleSimulator}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition"
            title="نمای تمام صفحه وب"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Android Device Body (Samsung / Pixel Style) */}
      <div className="relative w-full max-w-[390px] h-[820px] max-h-[92vh] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-700/60 shadow-black/80 flex flex-col overflow-hidden border-4 border-slate-800">
        {/* Hardware Bezel Glare effect */}
        <div className="absolute inset-0 rounded-[44px] pointer-events-none border border-white/10 z-50"></div>

        {/* Device Screen Container */}
        <div className="relative flex-1 w-full h-full bg-[#FAF7F5] rounded-[38px] overflow-hidden flex flex-col text-slate-800">
          {/* Android Status Bar */}
          <div className="h-10 bg-[#FAF7F5] w-full flex items-center justify-between px-6 text-xs text-[#333333] font-medium shrink-0 select-none z-40 border-b border-black/5">
            <span className="font-semibold tracking-wide text-[13px]">{time}</span>

            {/* Front Camera Punch Hole */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-4 h-4 rounded-full bg-black ring-1 ring-slate-700/40 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold">۹۸٪</span>
                <Battery className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* App Content Scrollable Container */}
          <div className="flex-1 w-full overflow-y-auto no-scrollbar relative flex flex-col bg-[#FAF7F5]">
            {children}
          </div>

          {/* Android Bottom Navigation Pill Bar */}
          <div className="h-5 bg-[#FAF7F5] w-full flex items-center justify-center shrink-0 z-40">
            <div className="w-32 h-1 bg-slate-400/60 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Simulator Device Info Footer */}
      <div className="mt-3 text-center text-xs text-slate-400 flex items-center gap-4">
        <span>Samsung Galaxy / Pixel Viewport</span>
        <span>•</span>
        <button
          onClick={onToggleSimulator}
          className="text-[#B76E79] hover:underline"
        >
          سوییچ به حالت تمام صفحه
        </button>
      </div>
    </div>
  );
};
