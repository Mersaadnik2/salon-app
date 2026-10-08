import { Appointment, BeautyService, CustomerProfile, Salon } from '../types';

export const INITIAL_SERVICES: BeautyService[] = [
  { 
    id: '1', 
    name: 'رنگ مو شکلاتی', 
    category: 'HAIR', 
    price: 850000, 
    durationMinutes: 120, 
    description: 'رنگ موی تخصصی با مواد ایتالیایی و ماندگاری بالا، شامل ویتامینه و براشینگ.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp3HMG6gH5ajnaxoJI7uKRK454pKPEHZRxNmbY-2_pwP8SIN7c8WIrmOgJLFYIs2zwefUSD87m2SRQ3n7uEoNPS0MnV8_FXlU6iPHyUG071styyYDPaCYKLQCitQHnYghyWQg_Hzq13Nz0r04f8npaacjQxkyYmWMyyUUQhAgKbpc7a9ni9AHbgpaHEkwOjUuVwBFWPzlpWT52qAkYAE3nnYpjWwaCxRFc8ue5_TvIHWwIlsrgrZ5jtg'
  },
  { 
    id: '2', 
    name: 'مانیکور ویژه', 
    category: 'NAIL', 
    price: 350000, 
    durationMinutes: 60, 
    description: 'مانیکور روسی به همراه پدیکور و ماساژ دست با لوسیون‌های گیاهی.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1dDOzojspIvky_VGJV62POIfs6ikfakjQLabThE1qTjkCNoDUt7fsITBMU7c-bnuKE6Vh54_hFusuVUfd_ZVACJPIbnN-4rIXIxxw4zqM8SDHru38KXf_pJSUzdGCW9svECNL5KqzOqaEcxW3-H1TqC5RODwRQ3plOJYwCdCrsuWJPD2AYrQJ2AYSTP8huhZU3Bc_JKS53OULI5NBWg_0PbFHGSa9JnN1WJ9Ga_3eCOpNyoiBStAetg'
  },
  { 
    id: '3', 
    name: 'براشینگ مجلسی و کرلی', 
    category: 'HAIR', 
    price: 300000, 
    durationMinutes: 45, 
    description: 'حالت‌دهی حرفه‌ای مو مناسب مراسم با ماندگاری بالا' 
  },
  { 
    id: '4', 
    name: 'میکروبلیدینگ و فیبروز ابرو', 
    category: 'BROW', 
    price: 1200000, 
    durationMinutes: 120, 
    description: 'قرینه‌سازی مویی و طبیعی با رنگ‌های ارگانیک فی' 
  },
  { 
    id: '5', 
    name: 'فیشیال و پاکسازی VIP پوست', 
    category: 'SKIN', 
    price: 650000, 
    durationMinutes: 75, 
    description: 'بخور سرد و گرم، میکرودرم، ماسک کلاژن و هیدرودرمی' 
  },
  { 
    id: '6', 
    name: 'میکاپ لایت و گریم عروسکی', 
    category: 'MAKEUP', 
    price: 950000, 
    durationMinutes: 90, 
    description: 'کانتورینگ چهره و ماندگاری ۲۴ ساعته با برند مک و هدی‌بیوتی' 
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    customerName: 'سارا احمدی',
    customerPhone: '09123456789',
    serviceName: 'رنگ موی شکلاتی',
    serviceId: '1',
    dateShamsi: '۱۴۰۵/۰۵/۲۰',
    time: '۱۴:۳۰',
    durationMinutes: 120,
    price: 850000,
    status: 'NEW',
    notes: 'پایه مو ۸، تمایل به تناژ دودی شکلاتی',
    salonId: 'salon-1',
  },
  {
    id: 'apt-2',
    customerName: 'سارا احمدی',
    customerPhone: '09123456789',
    serviceName: 'مانیکور ویژه',
    serviceId: '2',
    dateShamsi: '۱۴۰۵/۰۵/۲۲',
    time: '۱۰:۰۰',
    durationMinutes: 60,
    price: 350000,
    status: 'CONFIRMED',
    notes: 'طراحی فرنچ طبیعی',
    salonId: 'salon-2',
  },
  {
    id: 'apt-3',
    customerName: 'مریم کاظمی',
    customerPhone: '09129876543',
    serviceName: 'فیشیال و پاکسازی VIP پوست',
    serviceId: '5',
    dateShamsi: '۱۴۰۵/۰۵/۲۰',
    time: '۱۶:۳۰',
    durationMinutes: 75,
    price: 650000,
    status: 'CONFIRMED',
    notes: 'پوست حساس، نیاز به سرم آبرسان ضدقرمزی',
    salonId: 'salon-1',
  },
  {
    id: 'apt-4',
    customerName: 'رویا حسینی',
    customerPhone: '09198765432',
    serviceName: 'میکاپ لایت و گریم عروسکی',
    serviceId: '6',
    dateShamsi: '۱۴۰۵/۰۵/۲۱',
    time: '۱۱:۰۰',
    durationMinutes: 90,
    price: 950000,
    status: 'CONFIRMED',
    notes: 'همراه با مژه دانه‌ای طبیعی',
    salonId: 'salon-1',
  },
  {
    id: 'apt-5',
    customerName: 'الهام سعیدی',
    customerPhone: '09361112233',
    serviceName: 'میکروبلیدینگ و فیبروز ابرو',
    serviceId: '4',
    dateShamsi: '۱۴۰۵/۰۵/۲۱',
    time: '۱۵:۰۰',
    durationMinutes: 120,
    price: 1200000,
    status: 'NEW',
    notes: 'ترمیم دوره اول',
    salonId: 'salon-1',
  },
  {
    id: 'apt-6',
    customerName: 'شیدا طاهری',
    customerPhone: '09125556677',
    serviceName: 'براشینگ مجلسی و کرلی',
    serviceId: '3',
    dateShamsi: '۱۴۰۵/۰۵/۱۹',
    time: '۱۲:۰۰',
    durationMinutes: 45,
    price: 300000,
    status: 'DONE',
    salonId: 'salon-1',
  },
];

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'c-1',
    fullName: 'سارا احمدی',
    phoneNumber: '09123456789',
    birthDate: '۱۳۷۲/۰۶/۱۵',
    lastVisitDate: '۱۴۰۵/۰۵/۰۲',
    totalSpent: 4250000,
    notes: 'فرمول رنگ: ترکیب ۸.۱ دودی + ۹.۲ نسکافه‌ای با اکسیدان ۶٪. به آمونیاک زیاد حساسیت دارد.',
    isVip: true,
  },
  {
    id: 'c-2',
    fullName: 'نگین رضایی',
    phoneNumber: '09351234567',
    birthDate: '۱۳۷۸/۰۲/۲۱',
    lastVisitDate: '۱۴۰۵/۰۴/۱۸',
    totalSpent: 1800000,
    notes: 'فرم ناخن بادامی کوتاه، همیشه رنگ‌های نود و فرنچ مات می‌پسندد.',
    isVip: false,
  },
  {
    id: 'c-3',
    fullName: 'مریم کاظمی',
    phoneNumber: '09129876543',
    birthDate: '۱۳۶۹/۱۱/۰۴',
    lastVisitDate: '۱۴۰۵/۰۵/۱۰',
    totalSpent: 6700000,
    notes: 'مشتری VIP سالن - روتین پاکسازی ماهانه منظم. چای سبز بدون قند ترجیح می‌دهد.',
    isVip: true,
  },
  {
    id: 'c-4',
    fullName: 'رویا حسینی',
    phoneNumber: '09198765432',
    birthDate: '۱۳۷۵/۰۸/۳۰',
    lastVisitDate: '۱۴۰۵/۰۳/۲۵',
    totalSpent: 2900000,
    notes: 'میکاپ لایت با رژگونه هلویی و مژه طبیعی تکی.',
    isVip: false,
  },
  {
    id: 'c-5',
    fullName: 'پریناز اکبری',
    phoneNumber: '09127778899',
    birthDate: '۱۳۷۰/۰۴/۱۲',
    lastVisitDate: '۱۴۰۵/۰۵/۱۴',
    totalSpent: 5100000,
    notes: 'متقاضی خدمات احیا و بوتاکس مو.',
    isVip: true,
  },
];

export const INITIAL_SALONS: Salon[] = [
  {
    id: 'salon-1',
    name: 'سالن زیبایی مریم',
    ownerName: 'مریم سرمدی',
    phoneNumber: '02122001122',
    address: 'تهران، زعفرانیه',
    area: 'زعفرانیه',
    rating: 4.8,
    reviewCount: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFHN-3n36Q45zkJdYGjn6qkPnsq391wNuZ3P1bLjXs862gl4vDvscNgGbAvkKyf8gmG60oSHD4i83FIpit9XplU-5NI_Pcj3Vde3UkMPBkdM8wPStoVg5XYxq0j5vDNV-ER4jLOIikuc1DA3R2QwuzL6z6j2d8nGvyi8L2WhLYDetug-DwOl0RNYPU377E7HJbid4Wr4Ku2jMXiZ1fENjQKX-qjSERaYuNJnBcRq4aBPrEDYb-dnL_DQ',
    services: INITIAL_SERVICES,
    workingHours: {
      start: '09:30',
      end: '20:00',
      holidays: ['جمعه'],
    },
  },
  {
    id: 'salon-2',
    name: 'استودیو ناخن الهه',
    ownerName: 'الهه رستمی',
    phoneNumber: '02188993344',
    address: 'تهران، الهیه',
    area: 'الهیه',
    rating: 4.9,
    reviewCount: 86,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc1Ns8H6QO9BMJdNlWpEFn2o7dH9pfykB8F41cCrTSeN4sWY35affhR9TS9mnJRBnIZBGS13xAtJoH-23LNATb788kGt8-3yrl5rSR1lgNkMMNaCaa8Y0zb2GksJpRsoSQM3accWDf4IlNlglP-b-H4CF5qDuJqbxKi44eZBE6_6-KU2qxve69qxC0TcQCcZEwONIJ3qTjXY4KJr3pcyNyOS9aGJlP68f0hfj-N51OntRsw_Hgnomhkg',
    services: INITIAL_SERVICES.filter(s => s.category === 'NAIL' || s.category === 'BROW'),
    workingHours: {
      start: '10:00',
      end: '19:30',
      holidays: ['جمعه'],
    },
  },
  {
    id: 'salon-3',
    name: 'مرکز زیبایی ونوس',
    ownerName: 'رزا بهرامی',
    phoneNumber: '02126204555',
    address: 'تهران، خیابان فرشته، پلاک ۱۲',
    area: 'فرشته',
    rating: 4.7,
    reviewCount: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkV1hVyfwzH6NeoHxeu-ohO2sp5zsbBIhmenFkrNZ6xfe9y0OLu2PaXXux6vy2Rtjmm5Kl8hIR9mksAEkNCVOmnspt7knN5JEl7rFwIsWEkWi3uLUdNbnF3Z0k2B9tkN3O-8UMqJAh8hNFo4j0uV1Ua0hDwkQ5NZSY3bD6L_TiVsLt5mX5ydyABgjBO_I_hGL8zcCuwSCDSGXK8a2bph83XfMyE0qK4EEziw9c5Mmhp4k4WI_RZhp_sw',
    services: INITIAL_SERVICES,
    workingHours: {
      start: '09:00',
      end: '21:00',
      holidays: ['جمعه'],
    },
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price);
}

export function toPersianDigits(num: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}
