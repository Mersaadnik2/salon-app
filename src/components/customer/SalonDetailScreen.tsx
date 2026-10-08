import React, { useState } from 'react';
import { Salon } from '../../types';
import { formatPrice } from '../../data/initialData';
import { 
  Star, 
  MapPin, 
  ChevronRight, 
  Heart, 
  Clock, 
  Phone,
  Sparkles
} from 'lucide-react';

interface SalonDetailScreenProps {
  salon: Salon;
  onBack: () => void;
  onBookClicked: () => void;
}

export const SalonDetailScreen: React.FC<SalonDetailScreenProps> = ({
  salon,
  onBack,
  onBookClicked,
}) => {
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <div className="flex-1 flex flex-col bg-[#fff8f8] text-[#1f1a1c] relative min-h-screen pb-28">
      
      {/* Top App Bar matching Stitch */}
      <header className="sticky top-0 w-full z-40 bg-[#fff8f8]/80 backdrop-blur-md border-b border-[#d4c2c7]/30 flex items-center justify-between px-4 h-14">
        <button 
          onClick={onBack}
          className="text-[#31081d] p-1.5 rounded-full hover:bg-[#f6ebed] transition-colors active:scale-95"
          title="بازگشت"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-[#31081d] tracking-tight">Zibano</h1>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-[#31081d] p-1.5 rounded-full hover:bg-[#f6ebed] transition-colors active:scale-95"
          title="علاقه‌مندی"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#31081d] text-[#31081d]' : 'text-[#31081d]'}`} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto w-full">
        {/* Hero Image Section matching Stitch */}
        <div className="w-full h-56 md:h-72 relative overflow-hidden">
          <img
            src={salon.image}
            alt={salon.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#31081d]/90 via-[#31081d]/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{salon.name}</h2>
            <div className="flex items-center gap-4 text-white/90 text-xs">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-bold">{salon.rating}</span>
                <span>({salon.reviewCount || 120} نظر)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{salon.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Working hours badge */}
        <div className="px-4 py-3 bg-[#f6ebed] border-y border-[#d4c2c7]/20 flex items-center justify-between text-xs text-[#504348]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#7c5357]" />
            <span>ساعت کاری: {salon.workingHours.start} الی {salon.workingHours.end}</span>
          </div>
          <a
            href={`tel:${salon.phoneNumber}`}
            className="text-[#31081d] font-bold flex items-center gap-1 hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>تماس مستقیم</span>
          </a>
        </div>

        {/* Services Section matching Stitch */}
        <section className="p-4 mt-2">
          <h3 className="text-base font-bold text-[#31081d] mb-4">خدمات ما</h3>
          <div className="flex flex-col gap-3.5">
            {salon.services.map((service) => (
              <div
                key={service.id}
                className="bg-[#FDFCFB] border border-[#d4c2c7]/50 rounded-2xl p-3.5 flex gap-3.5 items-center shadow-[0_2px_12px_rgba(49,8,29,0.04)] hover:border-[#31081d]/30 transition"
              >
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-xs"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-[#f6ebed] text-[#31081d] flex items-center justify-center shrink-0">
                    <Sparkles className="w-8 h-8 opacity-40" />
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-between self-stretch">
                  <div>
                    <h4 className="text-sm font-bold text-[#31081d]">{service.name}</h4>
                    <p className="text-xs text-[#504348] mt-1 line-clamp-2 leading-relaxed">
                      {service.description || 'ارائه تخصصی با بهترین متریال و ماندگاری تضمینی.'}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-xs text-[#504348]">{service.durationMinutes} دقیقه</span>
                    <span className="text-sm font-bold text-[#D4AF37]">
                      {formatPrice(service.price)} <span className="text-[10px] font-normal text-[#504348]">تومان</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Book Now Button matching Stitch */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fff8f8]/95 backdrop-blur-md border-t border-[#d4c2c7]/30 p-3.5 flex justify-center z-50 shadow-lg">
        <button
          onClick={onBookClicked}
          className="w-full max-w-md bg-[#31081d] text-white text-sm font-bold py-3.5 rounded-full shadow-lg hover:shadow-xl hover:bg-[#4a1d32] transition-all active:scale-95"
        >
          رزرو وقت
        </button>
      </div>

    </div>
  );
};

