import React, { useState } from 'react';
import { Salon } from '../../types';
import { formatPrice } from '../../data/initialData';
import { 
  Search, 
  Star, 
  MapPin, 
  Scissors, 
  Sparkles, 
  Paintbrush, 
  Flower2, 
  Smile, 
  ChevronLeft
} from 'lucide-react';

interface CustomerHomeScreenProps {
  userName: string;
  salons: Salon[];
  onSelectSalon: (salon: Salon) => void;
  onQuickBook: (salon: Salon) => void;
}

export const CustomerHomeScreen: React.FC<CustomerHomeScreenProps> = ({
  userName,
  salons,
  onSelectSalon,
  onQuickBook,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('HAIR');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'MAKEUP', title: 'آرایش', icon: Smile },
    { id: 'NAIL', title: 'ناخن', icon: Paintbrush },
    { id: 'HAIR', title: 'مو', icon: Scissors },
    { id: 'SKIN', title: 'پوست', icon: Flower2 },
    { id: 'BROW', title: 'ابرو', icon: Sparkles },
  ];

  const filteredSalons = salons.filter((salon) => {
    const matchesSearch = 
      salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="flex-1 pb-8 space-y-6 bg-[#fff8f8] text-[#1f1a1c]">
      
      {/* Top Header matching Stitch */}
      <div className="bg-[#fff8f8]/90 backdrop-blur-md sticky top-0 z-20 px-4 py-3 border-b border-[#d4c2c7]/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcSA8n-PIY6Oku3hTPwfiB37K7HUpjv6uqlDjt48qYEF2_76RqlbnDF15eK2UGcts-VHPCaWoHX6avr_czAFOjd3wgav9RBPa9TIp6APubXOU4TfwMuDykEB5hA5Wtv_eu_Byjdr1JqJlCLRY3c3I5J3PR7sDW6AETzs8x7wCRGubjN3MrV8jCfwMsAMQsHzrVspEP3hoCQjZ9IB6PMcS3xjLMVUeasY_PEUd12k5Nyh0EU2ikdMwPLA"
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-[#31081d]/10"
          />
          <div>
            <h1 className="text-base font-bold text-[#31081d] leading-none">Zibano</h1>
            <p className="text-xs text-[#504348] mt-0.5 font-medium">سلام، {userName} احمدی</p>
          </div>
        </div>
        <button 
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#504348] hover:bg-[#f6ebed] transition-colors"
          title="موقعیت مکانی"
        >
          <MapPin className="w-5 h-5 text-[#7c5357]" />
        </button>
      </div>

      <div className="px-4 space-y-6 max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی سالن، خدمات زیبایی یا منطقه..."
            className="w-full pl-4 pr-10 py-2.5 bg-[#FDFCFB] rounded-2xl border border-[#d4c2c7]/60 focus:border-[#31081d] focus:ring-2 focus:ring-[#31081d]/10 text-xs shadow-xs outline-none transition"
          />
          <Search className="w-4 h-4 text-[#827378] absolute right-3.5 top-3 pointer-events-none" />
        </div>

        {/* Stitch Promo Banner */}
        <section className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(49,8,29,0.08)]">
          <div 
            className="bg-cover bg-center w-full h-44 absolute inset-0"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsENiC_cp9hxN5jRA2h_ef_5_iPQnRmeShx4yshKaX3KURU6QcfJ0TERI7jLIqDKsqZReiGpRa_pDQ8d34lcuzUp0jumReftGF4FQDYL0AQCZ79ZvWi9gISruRzbGBcFeXl_aHF7jM6Dj4v4Kgq89q2pPZoVG641OEWyOe934pqOiVsroyzCsRlz-BEbT8HpOnTJLMN4LPimOAAzQpsECAwnI1g0UXoStJ8l6V477xkgy88kSk-jDoZw')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#31081d]/90 via-[#31081d]/70 to-transparent" />
          <div className="relative h-44 flex flex-col justify-center p-5 text-white w-3/4">
            <span className="inline-block bg-[#D4AF37] text-[#31081d] text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2 w-max shadow-xs">
              تخفیف ویژه
            </span>
            <h2 className="text-xl font-bold mb-1 text-white leading-tight">۲۰٪ تخفیف رنگ مو</h2>
            <p className="text-xs text-[#FDFCFB]/90 mb-3">فقط تا پایان این هفته</p>
            <button 
              onClick={() => onSelectSalon(salons[0])}
              className="bg-[#FDFCFB] text-[#31081d] text-xs font-bold px-5 py-2 rounded-full w-max shadow-sm hover:shadow-md hover:bg-white active:scale-95 transition-all"
            >
              رزرو کنید
            </button>
          </div>
        </section>

        {/* Stitch Category Selection */}
        <section>
          <h3 className="text-sm font-bold text-[#31081d] mb-3">خدمات زیبایی</h3>
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex flex-col items-center gap-1.5 min-w-[70px] group transition"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#31081d] text-white shadow-md scale-105 ring-2 ring-[#31081d]/20'
                        : 'bg-[#f6ebed] text-[#31081d] hover:bg-[#31081d]/10'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs ${
                      isActive ? 'text-[#31081d] font-bold' : 'text-[#504348] font-medium'
                    }`}
                  >
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recommended Salons */}
        <section className="space-y-3 pb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#31081d]">سالن‌های پیشنهادی</h3>
            <span className="text-xs text-[#7c5357] font-medium cursor-pointer hover:underline">
              مشاهده همه
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSalons.map((salon) => (
              <div
                key={salon.id}
                onClick={() => onSelectSalon(salon)}
                className="bg-[#FDFCFB] rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(49,8,29,0.06)] border border-[#d4c2c7]/40 flex flex-col gap-3 hover:border-[#31081d]/40 transition-all cursor-pointer group"
              >
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={salon.image}
                    alt={salon.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[#FDFCFB]/90 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="text-[11px] font-bold text-[#31081d]">{salon.rating}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#31081d] mb-1 group-hover:text-[#844e65] transition-colors">
                    {salon.name}
                  </h4>
                  <p className="text-xs text-[#504348] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7c5357]" />
                    <span>{salon.address}</span>
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto pt-2.5 border-t border-[#f6ebed]">
                  <span className="text-[11px] text-[#504348]">شروع از:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#31081d]">
                      {formatPrice(salon.id === 'salon-2' ? 350000 : 500000)}
                    </span>
                    <span className="text-[10px] text-[#504348]">تومان</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

