import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Terminal, 
  Code, 
  Check, 
  Copy, 
  ExternalLink, 
  FileCode, 
  FolderArchive, 
  HelpCircle, 
  Layers, 
  Sparkles,
  QrCode,
  ShieldAlert,
  PlayCircle
} from 'lucide-react';
import { KOTLIN_PROJECT_FILES, ProjectFile } from '../utils/apkExport';

interface ApkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkExportModal: React.FC<ApkExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'quick_test' | 'android_studio' | 'github_actions' | 'source_code'>('quick_test');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copiedFile, setCopiedFile] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}`;

  const handleCopyCode = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'file') {
      setCopiedFile(true);
      setTimeout(() => setCopiedFile(false), 2000);
    } else {
      setCopiedCommand(type);
      setTimeout(() => setCopiedCommand(null), 2000);
    }
  };

  const downloadFile = (file: ProjectFile) => {
    const element = document.createElement('a');
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(blob);
    element.download = file.path.split('/').pop() || 'file.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadAllFiles = () => {
    KOTLIN_PROJECT_FILES.forEach((file, index) => {
      setTimeout(() => {
        downloadFile(file);
      }, index * 200);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#B76E79]/20 text-[#333333]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#B76E79] to-[#9E535E] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">راهنمای دریافت و خروجی APK برای اندروید</h2>
              <p className="text-xs text-pink-100">نحوه کامپایل، تست مستقیم روی گوشی و دانلود فایل‌های پروژه کاتلین</p>
            </div>
          </div>
          <button
            id="btn-close-apk-modal"
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-gray-200 bg-gray-50/80 px-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('quick_test')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'quick_test'
                ? 'border-[#B76E79] text-[#B76E79] bg-white shadow-xs'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>۱. تست فوری روی گوشی (PWA)</span>
          </button>

          <button
            onClick={() => setActiveTab('android_studio')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'android_studio'
                ? 'border-[#B76E79] text-[#B76E79] bg-white shadow-xs'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>۲. ساخت APK در Android Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('github_actions')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'github_actions'
                ? 'border-[#B76E79] text-[#B76E79] bg-white shadow-xs'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>۳. بیلد ابری رایگان (GitHub)</span>
          </button>

          <button
            onClick={() => setActiveTab('source_code')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'source_code'
                ? 'border-[#B76E79] text-[#B76E79] bg-white shadow-xs'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>۴. سورس‌کدهای کاتلین</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* TAB 1: QUICK PHONE TEST */}
          {activeTab === 'quick_test' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-900 text-xs sm:text-sm">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">سریع‌ترین راه تست روی گوشی شما (بدون نیاز به کامپیوتر یا نصب برنامه):</p>
                  <p className="mt-1 text-amber-800">
                    این اپلیکیشن کاملاً رسپانسیو و به صورت وب‌اپلیکیشن پیش‌رونده (PWA) طراحی شده است. می‌توانید همین الان بارکد زیر را با دوربین یا مرورگر گوشی اندرویدی خود اسکن کنید.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center justify-center p-5 bg-[#FAF7F5] rounded-2xl border border-dashed border-[#B76E79]/40 text-center">
                  <div className="p-3 bg-white rounded-xl shadow-md border border-gray-200">
                    <img 
                      src={qrCodeUrl} 
                      alt="QR Code" 
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-3 font-medium">اسکن با دوربین یا اسکنر گوشی اندروید</p>
                  <div className="mt-2 text-[11px] text-gray-400 max-w-xs break-all">
                    {currentUrl}
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                  <h3 className="font-bold text-base text-[#333333] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#B76E79] text-white flex items-center justify-center text-xs">📱</span>
                    نصب به عنوان اپلیکیشن (مانند فایل APK):
                  </h3>

                  <ol className="space-y-2.5 list-decimal list-inside pr-1">
                    <li className="leading-relaxed">
                      لینک بالا را در مرورگر <strong>Google Chrome</strong> یا <strong>Samsung Internet</strong> در گوشی باز کنید.
                    </li>
                    <li className="leading-relaxed">
                      روی منوی سه‌نقطه (⋮) بالای مرورگر بزنید.
                    </li>
                    <li className="leading-relaxed">
                      گزینه <strong>«افزودن به صفحه اصلی» (Add to Home screen)</strong> یا <strong>«نصب برنامه» (Install app)</strong> را لمس کنید.
                    </li>
                    <li className="leading-relaxed">
                      آیکون اپلیکیشن <strong>«زیبانو»</strong> روی صفحه اصلی گوشی اضافه می‌شود و بدون نوار آدرس مانند یک اپلیکیشن بومی اندروید اجرا می‌گردد!
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANDROID STUDIO */}
          {activeTab === 'android_studio' && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-blue-900">
                <p className="font-bold">مراحل ایجاد خروجی APK بومی از کدهای کاتلین در کامپیوتر:</p>
                <p className="mt-1 text-blue-800">
                  کدهای ارائه شده در پوشه `com.example.zibano` کامپوننت‌های مدرن <strong>Jetpack Compose</strong> هستند. برای بیلد کردن فایل APK مراحل زیر را انجام دهید:
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border border-gray-200 rounded-xl p-4 space-y-2 bg-white">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B76E79] text-white flex items-center justify-center text-xs">۱</span>
                    باز کردن پروژه در اندروید استودیو:
                  </div>
                  <p className="text-gray-600 text-xs pr-7">
                    پوشه پروژه را در نرم‌افزار <strong>Android Studio (نسخه Hedgehog یا بالاتر با JDK 17)</strong> باز کرده و اجازه دهید فرایند Gradle Sync تکمیل شود.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 space-y-2 bg-white">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B76E79] text-white flex items-center justify-center text-xs">۲</span>
                    دستور ساخت مستقیم فایل APK از منو:
                  </div>
                  <p className="text-gray-600 text-xs pr-7 leading-relaxed">
                    از منوی بالا به مسیر <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#B76E79] font-mono">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</code> بروید.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 space-y-2 bg-white">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B76E79] text-white flex items-center justify-center text-xs">۳</span>
                    یا اجرای دستور در ترمینال اندروید استودیو:
                  </div>
                  <div className="pr-7">
                    <div className="bg-slate-900 text-slate-100 p-3 rounded-lg flex items-center justify-between font-mono text-xs" dir="ltr">
                      <code>./gradlew assembleDebug</code>
                      <button
                        onClick={() => handleCopyCode('./gradlew assembleDebug', 'cmd1')}
                        className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 text-[11px] flex items-center gap-1"
                      >
                        {copiedCommand === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>کپی</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 space-y-2 bg-white">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B76E79] text-white flex items-center justify-center text-xs">۴</span>
                    محل ذخیره فایل APK نهایی:
                  </div>
                  <p className="text-gray-600 text-xs pr-7 leading-relaxed font-mono text-slate-700 bg-gray-50 p-2 rounded" dir="ltr">
                    app/build/outputs/apk/debug/app-debug.apk
                  </p>
                  <p className="text-gray-500 text-[11px] pr-7">
                    این فایل را به گوشی انتقال داده و روی آن کلیک کنید تا نصب شود. (نیاز به فعال بودن گزینه Install unknown apps دارد).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GITHUB ACTIONS */}
          {activeTab === 'github_actions' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs sm:text-sm text-emerald-900">
                <p className="font-bold">ساخت رایگان فایل APK در فضای ابری (بدون نیاز به نصب اندروید استودیو):</p>
                <p className="mt-1 text-emerald-800 text-xs">
                  می‌توانید کدهای این پروژه را روی گیت‌هاب (GitHub) پوش کنید. با قرار دادن فایل اکشنز زیر، هر بار که کدی را تغییر دهید، سرورهای گیت‌هاب فایل APK آماده را بیلد کرده و لینک دانلود مستقیم می‌دهند.
                </p>
              </div>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto relative" dir="ltr">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-slate-400">
                  <span>.github/workflows/android-build-apk.yml</span>
                  <button
                    onClick={() => handleCopyCode(KOTLIN_PROJECT_FILES.find(f => f.path.includes('workflows'))?.content || '', 'workflow')}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded text-xs"
                  >
                    {copiedCommand === 'workflow' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>کپی فایل کانفیگ</span>
                  </button>
                </div>
                <pre className="text-slate-300">
                  {KOTLIN_PROJECT_FILES.find(f => f.path.includes('workflows'))?.content}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: SOURCE CODE */}
          {activeTab === 'source_code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#333333]">فایل‌های کاتلین و تنظیمات پروژه</h4>
                  <p className="text-xs text-gray-500">مشاهده و دانلود تک‌تک فایل‌های پیاده‌سازی شده</p>
                </div>
                <button
                  id="btn-download-all-sources"
                  onClick={downloadAllFiles}
                  className="flex items-center gap-1.5 bg-[#B76E79] hover:bg-[#9E535E] text-white text-xs px-3 py-1.5 rounded-lg shadow-xs transition"
                >
                  <FolderArchive className="w-4 h-4" />
                  <span>دانلود همه فایل‌ها</span>
                </button>
              </div>

              {/* File Selector Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {KOTLIN_PROJECT_FILES.map((file, idx) => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition ${
                      selectedFileIndex === idx
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {file.path.split('/').pop()}
                  </button>
                ))}
              </div>

              {/* Active File Content Viewer */}
              {KOTLIN_PROJECT_FILES[selectedFileIndex] && (
                <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
                    <div>
                      <span className="font-mono text-slate-300" dir="ltr">{KOTLIN_PROJECT_FILES[selectedFileIndex].path}</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">{KOTLIN_PROJECT_FILES[selectedFileIndex].description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyCode(KOTLIN_PROJECT_FILES[selectedFileIndex].content, 'file')}
                        className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded text-xs"
                      >
                        {copiedFile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>کپی</span>
                      </button>
                      <button
                        onClick={() => downloadFile(KOTLIN_PROJECT_FILES[selectedFileIndex])}
                        className="flex items-center gap-1 bg-[#B76E79] hover:bg-[#9E535E] text-white px-2.5 py-1 rounded text-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود</span>
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto max-h-80 text-slate-300" dir="ltr">
                    {KOTLIN_PROJECT_FILES[selectedFileIndex].content}
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-5 py-3 flex items-center justify-between text-xs">
          <span className="text-gray-500">پلتفرم مدیریت سالن و نوبت‌دهی زیبانو (Zibano)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
          >
            بستن پنجره
          </button>
        </div>

      </div>
    </div>
  );
};
