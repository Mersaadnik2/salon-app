import React, { useState } from 'react';
import { Appointment } from '../../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Navigation, 
  XCircle,
  Sparkles
} from 'lucide-react';

interface CustomerAppointmentsScreenProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onNavigateToSalon?: (salonId?: string) => void;
}

export const CustomerAppointmentsScreen: React.FC<CustomerAppointmentsScreenProps> = ({
  appointments,
  onCancelAppointment,
  onNavigateToSalon,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const customerApts = appointments.filter(a => a.customerName.includes('سارا') || a.customerPhone.includes('09123456789'));
  const activeAppointments = customerApts.filter(a => a.status === 'NEW' || a.status === 'CONFIRMED');
  const historyAppointments = customerApts.filter(a => a.status === 'DONE' || a.status === 'CANCELLED');

  const currentList = activeTab === 'active' ? activeAppointments : historyAppointments;

  const getImageForService = (serviceName: string) => {
    if (serviceName.includes('رنگ')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAweHTos2u3xS3zKG8kNbIlgNK--_vEPGLm2ZrUgbdplXDvegh6cDL8UvqpwHgudBkRBmTPt_FhlwopMIWqj4burI0TIXl79P7zNNqpS6cdUW-wJwp8lcv7w-26POQiU_tc9L_D2u5_trUuRwB4YueC2Wb2RFnDpVos2M_YiHrzJ1sGP7WO4fzh3ccq2bgLi9SzpabhY8qofhjVCFna40HhrgZMO8sMIvv3heIlryHS6MbAVHygMWZcAA';
    }
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkV1hVyfwzH6NeoHxeu-ohO2sp5zsbBIhmenFkrNZ6xfe9y0OLu2PaXXux6vy2Rtjmm5Kl8hIR9mksAEkNCVOmnspt7knN5JEl7rFwIsWEkWi3uLUdNbnF3Z0k2B9tkN3O-8UMqJAh8hNFo4j0uV1Ua0hDwkQ5NZSY3bD6L_TiVsLt5mX5ydyABgjBO_I_hGL8zcCuwSCDSGXK8a2bph83XfMyE0qK4EEziw9c5Mmhp4k4WI_RZhp_sw';
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fff8f8] text-[#1f1a1c] pb-24">
      {/* Top Header matching Stitch */}
      <header className="bg-[#fff8f8]/80 backdrop-blur-md shadow-xs sticky top-0 w-full z-40 flex items-center justify-between px-4 h-14 border-b border-[#d4c2c7]/30">
        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYXPJeQtgX1RLvi9i7nHVppcNgD36jCOl1v4tf_dJeRWWsR3AEJrTBO81PLTh6cHp39LW_K9QMoED55Rwzi6l6hGp3lDJylpU9YRx1vth2cr0H1WXyZ_3XoNtSTPMgdBKlsD6AGxqye_Uki5eCFDuV1NGBTfi5rfmCPxqFRg1qqYnqFaeyn_GoI8-sgBXv5VaC8ZVi5RPemZ-g77A9MVFDd2W_GbH01oGDu8bqJFPlb-MAGKr6HKPySQ"
            alt="User Avatar"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-[#31081d]/15 shadow-xs"
          />
          <h1 className="text-base font-bold text-[#31081d] tracking-tight">Zibano</h1>
        </div>
        <button className="text-[#31081d] p-1.5 rounded-full hover:bg-[#f6ebed] transition active:scale-95">
          <MapPin className="w-5 h-5 text-[#7c5357]" />
        </button>
      </header>

      <main className="max-w-2xl mx-auto w-full px-4 pt-4 space-y-4">
        {/* Tabs matching Stitch */}
        <div className="flex border-b border-[#d4c2c7]/30">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 text-center text-xs font-bold transition-all relative ${
              activeTab === 'active'
                ? 'text-[#31081d] border-b-2 border-[#31081d]'
                : 'text-[#504348] hover:text-[#31081d]'
            }`}
          >
            نوبت‌های فعال ({activeAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-center text-xs font-bold transition-all relative ${
              activeTab === 'history'
                ? 'text-[#31081d] border-b-2 border-[#31081d]'
                : 'text-[#504348] hover:text-[#31081d]'
            }`}
          >
            تاریخچه ({historyAppointments.length})
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4 pt-1">
          {currentList.length === 0 ? (
            <div className="text-center py-12 bg-[#FDFCFB] rounded-2xl border border-dashed border-[#d4c2c7] p-6">
              <CalendarIcon className="w-10 h-10 text-[#7c5357] mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold text-[#31081d]">
                {activeTab === 'active' ? 'نوبت فعالی در حال حاضر ندارید.' : 'تاریخچه نوبتی یافت نشد.'}
              </p>
              <p className="text-[11px] text-[#504348] mt-1">می‌توانید از بخش کاوش، سالن زیبایی مورد نظرتان را رزرو کنید.</p>
            </div>
          ) : (
            currentList.map((apt) => (
              <div
                key={apt.id}
                className="bg-[#FDFCFB] rounded-2xl border border-[#d4c2c7]/40 shadow-[0_4px_24px_rgba(49,8,29,0.04)] overflow-hidden flex flex-col sm:flex-row hover:border-[#31081d]/30 transition group"
              >
                {/* Image & Status Badge */}
                <div className="h-36 sm:h-auto sm:w-44 relative shrink-0 bg-gray-100">
                  <img
                    src={getImageForService(apt.serviceName)}
                    alt={apt.serviceName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        apt.status === 'NEW'
                          ? 'bg-[#F5EFF2] text-[#31081d]'
                          : apt.status === 'CONFIRMED'
                          ? 'bg-[#e8f5e9] text-[#2D6A4F]'
                          : apt.status === 'DONE'
                          ? 'bg-blue-50 text-blue-800'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm text-[#31081d]">{apt.serviceName}</h3>
                      <span className="text-xs font-bold text-[#7c5357]">
                        {apt.salonId === 'salon-2' ? 'استودیو ناخن الهه' : 'سالن مریم'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3 text-[#504348] text-xs">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#31081d]" />
                        <span>{apt.dateShamsi}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#31081d]" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-1 w-full text-[#7c5357] text-[11px] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>تهران، خیابان فرشته، پلاک ۱۲</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions matching Stitch */}
                  {apt.status !== 'CANCELLED' && apt.status !== 'DONE' && (
                    <div className="flex flex-wrap gap-2 mt-4 border-t border-[#d4c2c7]/30 pt-3">
                      <button
                        onClick={() => alert(`مسیریابی به سمت ${apt.salonId === 'salon-2' ? 'استودیو ناخن الهه' : 'سالن زیبایی مریم'} فعال شد.`)}
                        className="px-4 py-1.5 bg-[#31081d] text-white rounded-full text-xs font-bold hover:shadow-md transition active:scale-95 flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>مسیریابی</span>
                      </button>
                      <button
                        onClick={() => onCancelAppointment(apt.id)}
                        className="px-4 py-1.5 border border-[#d4c2c7] text-[#504348] rounded-full text-xs font-bold hover:bg-[#ebe0e2] transition active:scale-95"
                      >
                        لغو نوبت
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
