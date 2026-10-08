import React, { useState, useEffect } from 'react';
import { 
  ActiveScreen, 
  Appointment, 
  BeautyService, 
  CustomerProfile, 
  Salon, 
  UserRole,
  AppNotification
} from './types';
import { 
  INITIAL_APPOINTMENTS, 
  INITIAL_CUSTOMERS, 
  INITIAL_SALONS, 
  INITIAL_SERVICES 
} from './data/initialData';
import { PhoneFrame } from './components/PhoneFrame';
import { LoginScreen } from './components/auth/LoginScreen';
import { OwnerHomeScreen } from './components/owner/OwnerHomeScreen';
import { AppointmentsScreen } from './components/owner/AppointmentsScreen';
import { ReportsScreen } from './components/owner/ReportsScreen';
import { ServicesManagementScreen } from './components/owner/ServicesManagementScreen';
import { CustomerListScreen, CustomerProfileScreen } from './components/owner/CustomerListScreen';
import { OwnerProfileScreen } from './components/owner/OwnerProfileScreen';
import { CustomerHomeScreen } from './components/customer/CustomerHomeScreen';
import { CustomerAppointmentsScreen } from './components/customer/CustomerAppointmentsScreen';
import { CustomerProfileView } from './components/customer/CustomerProfileView';
import { SalonDetailScreen } from './components/customer/SalonDetailScreen';
import { BookingScreen } from './components/customer/BookingScreen';
import { BottomNav } from './components/common/BottomNav';
import { NewAppointmentModal } from './components/common/NewAppointmentModal';
import { NewCustomerModal } from './components/common/NewCustomerModal';
import { HeadsUpNotification } from './components/common/HeadsUpNotification';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { playNotificationChime } from './utils/notificationSound';
import { Check, ArrowLeftRight, Bell } from 'lucide-react';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'تایید نوبت خانم مینا کریمی',
    message: 'نوبت میکاپ و گریم تخصصی برای تاریخ شنبه ۲۰ مرداد ساعت ۱۷:۰۰ تایید و پیامک ارسال شد.',
    type: 'CONFIRMATION',
    timestamp: '۱۰ دقیقه پیش',
    read: true,
    customerName: 'مینا کریمی',
    serviceName: 'میکاپ و گریم تخصصی',
    smsPreview: 'سلام مینا عزیز، نوبت شما برای «میکاپ و گریم تخصصی» در سالن زیبایی مریم برای تاریخ ۲۰ مرداد ساعت ۱۷:۰۰ تایید شد.'
  },
  {
    id: 'notif-2',
    title: 'درخواست رزرو جدید از سارا احمدی',
    message: 'مشتری جدید سارا احمدی درخواست رزرو خدمت «رنگ مو شکلاتی» در ساعت ۱۴:۳۰ ثبت نموده است.',
    type: 'NEW_BOOKING',
    timestamp: '۲۵ دقیقه پیش',
    read: false,
    customerName: 'سارا احمدی',
    serviceName: 'رنگ مو ترکیبی شکلاتی'
  }
];

export default function App() {
  // App state
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('owner_home');
  const [userRole, setUserRole] = useState<UserRole>('SALON_OWNER');
  const [isSimulatorMode, setIsSimulatorMode] = useState(true);

  // Business Data State
  const [services, setServices] = useState<BeautyService[]>(INITIAL_SERVICES);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [salons, setSalons] = useState<Salon[]>(INITIAL_SALONS);

  // Notification State
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeHeadsUp, setActiveHeadsUp] = useState<AppNotification | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Selected entities for detail screens
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const [selectedSalon, setSelectedSalon] = useState<Salon>(INITIAL_SALONS[0]);

  // Modal dialog states
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Auth handler
  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    if (role === 'SALON_OWNER') {
      setCurrentScreen('owner_home');
      showToast('با موفقیت وارد پنل مدیریت سالن شدید');
    } else {
      setCurrentScreen('customer_home');
      showToast('به زیبانو خوش آمدید! سالن مورد نظر خود را انتخاب کنید');
    }
  };

  // Appointments actions with Notification & Sound
  const handleConfirmAppointment = (id: string, customSmsText?: string) => {
    const targetApt = appointments.find(a => a.id === id);
    
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'CONFIRMED' } : a)
    );

    // Play notification sound
    playNotificationChime('confirm');

    const customerName = targetApt ? targetApt.customerName : 'مشتری';
    const serviceName = targetApt ? targetApt.serviceName : 'خدمت انتخابی';
    const dateShamsi = targetApt ? targetApt.dateShamsi : 'امروز';
    const time = targetApt ? targetApt.time : '۱۴:۳۰';

    const smsContent = customSmsText || `سلام ${customerName} عزیز، نوبت شما برای «${serviceName}» در سالن زیبایی مریم برای تاریخ ${dateShamsi} ساعت ${time} با موفقیت تایید و قطعی شد. منتظر حضور گرمتان هستیم.`;

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `تایید و پذیرش نوبت: ${customerName}`,
      message: `نوبت ${customerName} برای خدمت «${serviceName}» در تاریخ ${dateShamsi} ساعت ${time} تایید شد و پیامک خودکار ارسال گردید.`,
      type: 'CONFIRMATION',
      timestamp: 'هم‌اکنون',
      read: false,
      appointmentId: id,
      customerName,
      serviceName,
      salonName: 'سالن زیبایی مریم',
      smsPreview: smsContent
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveHeadsUp(newNotif);
    showToast(`نوبت ${customerName} با موفقیت تایید شد و اعلان ارسال گردید.`);
  };

  const handleDoneAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'DONE' } : a)
    );
    showToast('وضعیت نوبت به «انجام شده» تغییر یافت.');
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a)
    );
    showToast('نوبت لغو گردید.');
  };

  const handleAddAppointment = (newApt: Omit<Appointment, 'id'>) => {
    const apt: Appointment = {
      ...newApt,
      id: `apt-${Date.now()}`,
    };
    setAppointments(prev => [apt, ...prev]);
    playNotificationChime('confirm');

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'ثبت و تایید نوبت جدید',
      message: `نوبت جدید برای خانم ${newApt.customerName} برای خدمت ${newApt.serviceName} ثبت شد.`,
      type: 'CONFIRMATION',
      timestamp: 'هم‌اکنون',
      read: false,
      appointmentId: apt.id,
      customerName: newApt.customerName,
      serviceName: newApt.serviceName
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveHeadsUp(newNotif);
    showToast('نوبت جدید با موفقیت در سیستم ثبت و تایید گردید.');
  };

  // Customer actions
  const handleAddCustomer = (newCust: Omit<CustomerProfile, 'id'>) => {
    const cust: CustomerProfile = {
      ...newCust,
      id: `cust-${Date.now()}`,
    };
    setCustomers(prev => [cust, ...prev]);
    showToast(`پرونده مشتری ${newCust.fullName} با موفقیت تشکیل شد.`);
  };

  const handleSendCustomerSms = (cust: CustomerProfile) => {
    playNotificationChime('pop');
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `ارسال پیامک یادآوری: ${cust.fullName}`,
      message: `پیامک یادآوری نوبت با موفقیت به شماره ${cust.phoneNumber} تحویل داده شد.`,
      type: 'SMS_SENT',
      timestamp: 'هم‌اکنون',
      read: false,
      customerName: cust.fullName,
      smsPreview: `سلام ${cust.fullName} عزیز، یادآوری نوبت شما در سالن مریم. منتظر دیدارتان هستیم.`
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveHeadsUp(newNotif);
    showToast(`پیامک یادآوری نوبت برای شماره ${cust.phoneNumber} ارسال گردید.`);
  };

  // Services actions
  const handleAddService = (newService: Omit<BeautyService, 'id'>) => {
    const s: BeautyService = {
      ...newService,
      id: `svc-${Date.now()}`,
    };
    setServices(prev => [...prev, s]);
    showToast(`خدمت «${newService.name}» به لیست خدمات اضافه شد.`);
  };

  const handleDeleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('خدمت مورد نظر حذف شد.');
  };

  // Customer booking handler
  const handleBookingComplete = (newApt: Omit<Appointment, 'id'>) => {
    const apt: Appointment = {
      ...newApt,
      id: `apt-${Date.now()}`,
    };
    setAppointments(prev => [apt, ...prev]);
    setCurrentScreen('appointments');
    playNotificationChime('confirm');

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'رزرو شما ثبت شد!',
      message: `درخواست رزرو ${newApt.serviceName} در سالن مریم برای ${newApt.dateShamsi} ساعت ${newApt.time} ارسال شد.`,
      type: 'NEW_BOOKING',
      timestamp: 'هم‌اکنون',
      read: false,
      appointmentId: apt.id,
      serviceName: newApt.serviceName
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveHeadsUp(newNotif);
    showToast('رزرو نوبت با موفقیت ثبت شد! اعلان تایید به زودی دریافت می‌شود.');
  };

  // Test Notification Trigger
  const handleTriggerTestNotification = () => {
    const randomNames = ['مهسا پیروزی', 'نیلوفر راد', 'سحر یوسفی', 'پریناز افشار'];
    const randomServices = ['رنگ و لایت بالیاژ', 'پدیکور و کفسابی VIP', 'کاشت ناخن ژلیش', 'پاکسازی پوست'];
    const chosenName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const chosenService = randomServices[Math.floor(Math.random() * randomServices.length)];

    const testNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `تایید و پذیرش نوبت: ${chosenName}`,
      message: `نوبت خانم ${chosenName} برای خدمت «${chosenService}» در سالن زیبایی مریم تایید و ثبت شد.`,
      type: 'CONFIRMATION',
      timestamp: 'هم‌اکنون',
      read: false,
      customerName: chosenName,
      serviceName: chosenService,
      smsPreview: `سلام ${chosenName} عزیز، نوبت شما برای «${chosenService}» در سالن زیبایی مریم تایید گردید. منتظر حضور گرمتان هستیم.`
    };

    setNotifications(prev => [testNotif, ...prev]);
    setActiveHeadsUp(testNotif);
    playNotificationChime('confirm');
  };

  // Role toggle
  const toggleUserRole = () => {
    if (userRole === 'SALON_OWNER') {
      setUserRole('CUSTOMER');
      setCurrentScreen('customer_home');
      showToast('سوییچ به حالت مشتری (رزرو نوبت)');
    } else {
      setUserRole('SALON_OWNER');
      setCurrentScreen('owner_home');
      showToast('سوییچ به حالت سالن‌دار (مدیریت سالن)');
    }
  };

  const pendingCount = appointments.filter(a => a.status === 'NEW').length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <PhoneFrame
      isSimulatorMode={isSimulatorMode}
      onToggleSimulator={() => setIsSimulatorMode(!isSimulatorMode)}
    >
      <div className="flex-1 flex flex-col min-h-full relative text-[#31081d]">
        
        {/* Heads-up Push Notification Floating on Top */}
        <HeadsUpNotification
          notification={activeHeadsUp}
          onDismiss={() => setActiveHeadsUp(null)}
          onViewAppointment={(id) => {
            setCurrentScreen('appointments');
          }}
          onOpenNotificationCenter={() => setIsNotificationDrawerOpen(true)}
        />

        {/* Top Floating Role & Notification Bell Banner */}
        {currentScreen !== 'login' && (
          <div className="bg-[#fff8f8]/90 backdrop-blur-md border-b border-[#d4c2c7]/30 px-3.5 py-2 flex items-center justify-between text-xs shrink-0 z-30">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleUserRole}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6ebed] hover:bg-[#ebe0e2] text-[#31081d] font-bold border border-[#d4c2c7]/50 transition active:scale-95 shadow-2xs"
                title="تغییر نقش بین سالن‌دار و مشتری"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#7c5357]" />
                <span>نقش فعال: {userRole === 'SALON_OWNER' ? 'سالن‌دار (مریم)' : 'مشتری (سارا)'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Notification Center Bell Button */}
              <button
                id="btn-notification-bell"
                onClick={() => {
                  setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                  setIsNotificationDrawerOpen(true);
                }}
                className="relative p-1.5 rounded-full bg-[#f6ebed] hover:bg-[#ebe0e2] text-[#31081d] border border-[#d4c2c7]/50 transition active:scale-95"
                title="مشاهده نوتیفیکیشن‌ها و پیامک‌ها"
              >
                <Bell className="w-4 h-4 text-[#7c5357]" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#31081d] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotifCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Screen Routing */}
        <main className="flex-1 flex flex-col">
          {currentScreen === 'login' && (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          )}

          {currentScreen === 'owner_home' && (
            <OwnerHomeScreen
              salonName="سالن زیبایی مریم"
              appointments={appointments}
              onNavigate={setCurrentScreen}
              onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
              onOpenNewCustomer={() => setIsNewCustomerOpen(true)}
              onConfirmAppointment={handleConfirmAppointment}
              onCancelAppointment={handleCancelAppointment}
            />
          )}

          {currentScreen === 'appointments' && (
            userRole === 'CUSTOMER' ? (
              <CustomerAppointmentsScreen
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
              />
            ) : (
              <AppointmentsScreen
                appointments={appointments}
                onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
                onConfirmAppointment={handleConfirmAppointment}
                onDoneAppointment={handleDoneAppointment}
                onCancelAppointment={handleCancelAppointment}
              />
            )
          )}

          {currentScreen === 'reports' && (
            <ReportsScreen />
          )}

          {currentScreen === 'services' && (
            <ServicesManagementScreen
              services={services}
              onAddService={handleAddService}
              onDeleteService={handleDeleteService}
            />
          )}

          {currentScreen === 'customers' && (
            <CustomerListScreen
              customers={customers}
              onSelectCustomer={(cust) => {
                setSelectedCustomer(cust);
                setCurrentScreen('customer_profile');
              }}
              onOpenNewCustomer={() => setIsNewCustomerOpen(true)}
            />
          )}

          {currentScreen === 'customer_profile' && selectedCustomer && (
            <CustomerProfileScreen
              customer={selectedCustomer}
              onBack={() => setCurrentScreen('customers')}
              onBookForCustomer={() => {
                setIsNewAppointmentOpen(true);
              }}
              onSendSms={handleSendCustomerSms}
            />
          )}

          {currentScreen === 'owner_profile' && (
            userRole === 'CUSTOMER' ? (
              <CustomerProfileView
                onLogout={() => setCurrentScreen('login')}
                onShowToast={showToast}
              />
            ) : (
              <OwnerProfileScreen
                salonName="سالن زیبایی مریم"
                onLogout={() => setCurrentScreen('login')}
                onShowToast={showToast}
              />
            )
          )}

          {currentScreen === 'customer_home' && (
            <CustomerHomeScreen
              userName="سارا"
              salons={salons}
              onSelectSalon={(salon) => {
                setSelectedSalon(salon);
                setCurrentScreen('salon_detail');
              }}
              onQuickBook={(salon) => {
                setSelectedSalon(salon);
                setCurrentScreen('booking');
              }}
            />
          )}

          {currentScreen === 'salon_detail' && (
            <SalonDetailScreen
              salon={selectedSalon}
              onBack={() => setCurrentScreen('customer_home')}
              onBookClicked={() => setCurrentScreen('booking')}
            />
          )}

          {currentScreen === 'booking' && (
            <BookingScreen
              salon={selectedSalon}
              existingAppointments={appointments}
              onBack={() => setCurrentScreen('salon_detail')}
              onBookingComplete={handleBookingComplete}
            />
          )}
        </main>

        {/* Bottom Tab Bar (Visible on main views) */}
        {currentScreen !== 'login' && currentScreen !== 'salon_detail' && currentScreen !== 'booking' && (
          <BottomNav
            currentScreen={currentScreen}
            userRole={userRole}
            pendingAppointmentsCount={pendingCount}
            onNavigate={setCurrentScreen}
            onSwitchRole={toggleUserRole}
          />
        )}

        {/* In-App Floating Toast Feedback */}
        {toastMessage && (
          <div className="fixed bottom-14 inset-x-4 max-w-sm mx-auto z-50 animate-bounce">
            <div className="bg-[#31081d]/95 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-[#d4c2c7]/40 flex items-center gap-2.5 text-xs">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span className="font-medium leading-tight">{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Notification Drawer (Center) */}
        <NotificationDrawer
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          notifications={notifications}
          onClearNotifications={() => setNotifications([])}
          onSelectNotification={(notif) => {
            if (notif.appointmentId) {
              setCurrentScreen('appointments');
              setIsNotificationDrawerOpen(false);
            }
          }}
          onTriggerTestNotification={handleTriggerTestNotification}
        />

        {/* New Appointment Modal */}
        <NewAppointmentModal
          isOpen={isNewAppointmentOpen}
          onClose={() => setIsNewAppointmentOpen(false)}
          services={services}
          existingAppointments={appointments}
          onAddAppointment={handleAddAppointment}
        />

        {/* New Customer Modal */}
        <NewCustomerModal
          isOpen={isNewCustomerOpen}
          onClose={() => setIsNewCustomerOpen(false)}
          onAddCustomer={handleAddCustomer}
        />

      </div>
    </PhoneFrame>
  );
}
