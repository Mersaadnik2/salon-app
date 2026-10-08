import React, { useState } from 'react';
import { formatPrice } from '../../data/initialData';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Award, 
  Calendar, 
  ArrowUpRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const ReportsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');

  const weeklyData = [
    { day: 'شنبه', revenue: 3.5, customers: 12 },
    { day: '۱شنبه', revenue: 2.8, customers: 9 },
    { day: '۲شنبه', revenue: 4.2, customers: 15 },
    { day: '۳شنبه', revenue: 3.1, customers: 11 },
    { day: '۴شنبه', revenue: 5.4, customers: 18 },
    { day: '۵شنبه', revenue: 6.8, customers: 22 },
    { day: 'جمعه', revenue: 1.2, customers: 4 },
  ];

  const topServices = [
    { rank: '۱', name: 'رنگ موی ترکیبی و لایت', count: '۱۸ انجام شده', income: 15300000, category: 'مو' },
    { rank: '۲', name: 'کاشت ناخن ژل و دیزاین', count: '۲۴ انجام شده', income: 10800000, category: 'ناخن' },
    { rank: '۳', name: 'فیشیال و پاکسازی پوست', count: '۱۰ انجام شده', income: 6500000, category: 'پوست' },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-5 bg-[#FAF7F5]">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-[#333333] flex items-center gap-2">
          <span>گزارشات مالی و عملکرد</span>
          <span className="text-xl">📈</span>
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">تحلیل آماری درآمد، تعداد مراجعین و خدمات پرفروش</p>
      </div>

      {/* Period Filter Tabs */}
      <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
        <button
          onClick={() => setSelectedPeriod('today')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            selectedPeriod === 'today' ? 'bg-[#B76E79] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          امروز
        </button>
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            selectedPeriod === 'week' ? 'bg-[#B76E79] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          این هفته
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            selectedPeriod === 'month' ? 'bg-[#B76E79] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          این ماه
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#B76E79]/15 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-medium">درآمد کل دوره</span>
            <div className="p-1.5 rounded-lg bg-pink-50 text-[#B76E79]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black text-[#B76E79]">
            {selectedPeriod === 'today' ? '۳,۵۰۰,۰۰۰' : selectedPeriod === 'week' ? '۲۷,۰۰۰,۰۰۰' : '۹۴,۵۰۰,۰۰۰'}
            <span className="text-[11px] text-gray-400 font-normal mr-1">تومان</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>۱۸٪ رشد نسبت به دوره قبل</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#B76E79]/15 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-medium">تعداد مشتریان</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-[#D4AF37]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black text-gray-900">
            {selectedPeriod === 'today' ? '۱۲ نفر' : selectedPeriod === 'week' ? '۹۱ نفر' : '۳۴۰ نفر'}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
            <span>میانگین فاکتور: ۶۵۰,۰۰۰ ت</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart Section (Canvas BarChart from Kotlin code translated to Recharts) */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-[#B76E79]" />
            <span>نمودار درآمد روزانه (میلیون تومان)</span>
          </h3>
          <span className="text-[11px] text-gray-400">هفته جاری</span>
        </div>

        <div className="h-48 w-full pt-2" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#666' }} />
              <YAxis tick={{ fontSize: 10, fill: '#888' }} />
              <Tooltip 
                formatter={(val: any) => [`${val} میلیون تومان`, 'درآمد']}
                contentStyle={{ borderRadius: 12, border: '1px solid #B76E79', direction: 'rtl', fontSize: 12 }}
              />
              <Bar dataKey="revenue" fill="#B76E79" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Services */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <span>محبوب‌ترین و پرسودترین خدمات</span>
        </h3>

        <div className="space-y-2">
          {topServices.map((service) => (
            <div
              key={service.rank}
              className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-pink-50 text-[#B76E79] font-black text-xs flex items-center justify-center">
                  {service.rank}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">{service.name}</h4>
                  <span className="text-[11px] text-gray-500">{service.count}</span>
                </div>
              </div>

              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-[#D4AF37]">
                  {formatPrice(service.income)} تومان
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
