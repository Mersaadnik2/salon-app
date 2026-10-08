import React, { useState } from 'react';
import { BeautyService, ServiceCategory } from '../../types';
import { formatPrice } from '../../data/initialData';
import { 
  Scissors, 
  Plus, 
  Edit3, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Trash2,
  Check,
  X
} from 'lucide-react';

interface ServicesManagementScreenProps {
  services: BeautyService[];
  onAddService: (service: Omit<BeautyService, 'id'>) => void;
  onDeleteService: (id: string) => void;
}

export const ServicesManagementScreen: React.FC<ServicesManagementScreenProps> = ({
  services,
  onAddService,
  onDeleteService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'ALL'>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for new service
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('HAIR');
  const [price, setPrice] = useState('500000');
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [description, setDescription] = useState('');

  const categories = [
    { id: 'ALL', label: 'همه خدمات' },
    { id: 'HAIR', label: 'مو و رنگ' },
    { id: 'NAIL', label: 'ناخن' },
    { id: 'BROW', label: 'ابرو و مژه' },
    { id: 'MAKEUP', label: 'میکاپ و گریم' },
    { id: 'SKIN', label: 'پوست و فیشیال' },
  ] as const;

  const filteredServices = services.filter((s) => {
    if (selectedCategory === 'ALL') return true;
    return s.category === selectedCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddService({
      name,
      category,
      price: Number(price) || 100000,
      durationMinutes: Number(durationMinutes) || 30,
      description,
    });

    setName('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-5 bg-[#FAF7F5]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[#333333] flex items-center gap-2">
            <span>مدیریت خدمات سالن</span>
            <span className="text-xl">✂️</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">تعریف لیست خدمات، قیمت‌ها و مدت زمان هر خدمت</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B76E79] hover:bg-[#9E535E] text-white text-xs font-bold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن خدمت جدید</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#B76E79] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services List Grid */}
      <div className="space-y-2.5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-[#B76E79]/30 transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-gray-900">{service.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-pink-50 text-[#B76E79] font-medium">
                  {service.category === 'HAIR' && 'مو'}
                  {service.category === 'NAIL' && 'ناخن'}
                  {service.category === 'BROW' && 'ابرو'}
                  {service.category === 'MAKEUP' && 'میکاپ'}
                  {service.category === 'SKIN' && 'پوست'}
                </span>
              </div>
              {service.description && (
                <p className="text-xs text-gray-500 line-clamp-1">{service.description}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-500 pt-0.5">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#B76E79]" />
                  <span>{service.durationMinutes} دقیقه</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left">
                <div className="text-sm font-black text-[#D4AF37]">
                  {formatPrice(service.price)}
                </div>
                <div className="text-[10px] text-gray-400">تومان</div>
              </div>

              <button
                onClick={() => onDeleteService(service.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                title="حذف خدمت"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 animate-fadeIn border border-[#B76E79]/20">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#B76E79]" />
                <span>تعریف خدمت جدید</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">نام خدمت زیبایی</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثلاً رنگ موی آمبره، کاشت مژه هیدن..."
                  required
                  className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">دسته‌بندی</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none bg-white"
                  >
                    <option value="HAIR">مو و رنگ</option>
                    <option value="NAIL">ناخن</option>
                    <option value="BROW">ابرو و مژه</option>
                    <option value="MAKEUP">میکاپ و گریم</option>
                    <option value="SKIN">پوست و فیشیال</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">مدت زمان (دقیقه)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    min="15"
                    step="15"
                    required
                    className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">قیمت (تومان)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="10000"
                  step="10000"
                  required
                  className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">توضیحات اختیاری</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="جزئیات برند مواد مصرفی، نحوه اجرا..."
                  rows={2}
                  className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:border-[#B76E79] outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#B76E79] hover:bg-[#9E535E] text-white font-bold transition shadow-xs"
                >
                  ثبت خدمت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
