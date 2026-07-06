'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench, ChevronRight, ChevronLeft, Check, Clock, MapPin,
  Phone, CalendarDays, Star, Shield, ArrowRight, IndianRupee,
  Languages,
} from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/data';
import { cn, formatPrice } from '@/lib/utils';

const acTypes = ['Split AC', 'Window AC', 'Cassette AC', 'Tower AC', 'Duct AC', 'VRV/VRF'];
const brands = ['LG', 'Samsung', 'Voltas', 'Daikin', 'Blue Star', 'Hitachi', 'Panasonic', 'Carrier', 'Godrej', 'Whirlpool', 'Lloyd', 'Haier', 'IFB', 'Mitsubishi', 'O General'];
const issues = ['Not Cooling', 'Not Starting', 'Water Leakage', 'Noise Problem', 'Gas Leak', 'Power Issue', 'Remote Issue', 'PCB Problem', 'Compressor Issue', 'Deep Cleaning', 'Other'];
const timeSlots = [
  '09:00-10:00', '10:00-11:00', '11:00-12:00',
  '12:00-13:00', '14:00-15:00', '15:00-16:00',
  '16:00-17:00', '17:00-18:00',
];

type Step = 'service' | 'details' | 'schedule' | 'review';
type Lang = 'en' | 'hi';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    'steps.service': 'Service',
    'steps.details': 'Details',
    'steps.schedule': 'Schedule',
    'steps.review': 'Review',
    'service.title': 'Choose a Service',
    'service.subtitle': 'Select the service you need',
    'details.title': 'Service Details',
    'details.subtitle': 'Tell us about your AC',
    'details.acType': 'AC Type',
    'details.brand': 'Brand',
    'details.issue': 'Issue',
    'details.notes': 'Additional Notes (Optional)',
    'details.notesPlaceholder': 'Describe the issue in detail...',
    'schedule.title': 'Schedule Service',
    'schedule.subtitle': 'Choose date, time, and location',
    'schedule.emergency.title': 'Emergency Service',
    'schedule.emergency.desc': 'Priority service within 2 hours',
    'schedule.emergency.enabled': 'Enabled',
    'schedule.emergency.enable': 'Enable',
    'schedule.date': 'Preferred Date',
    'schedule.time': 'Preferred Time',
    'schedule.pincode': 'Pincode',
    'schedule.pincodePlaceholder': 'Enter your pincode',
    'schedule.address': 'Full Address',
    'schedule.addressPlaceholder': 'House/Flat no., Street, Landmark, City...',
    'review.title': 'Review Your Booking',
    'review.subtitle': 'Please confirm all details before submitting',
    'review.lblService': 'Service',
    'review.lblAcType': 'AC Type',
    'review.lblBrand': 'Brand',
    'review.lblIssue': 'Issue',
    'review.lblDate': 'Date',
    'review.lblTime': 'Time',
    'review.lblPincode': 'Pincode',
    'review.lblEmergency': 'Emergency',
    'review.lblPrice': 'Price',
    'review.contactTitle': 'Your Contact Details',
    'review.namePlaceholder': 'Your name',
    'review.phonePlaceholder': 'Phone number',
    'review.submit': 'Confirm Booking',
    'review.submitting': 'Processing Payment...',
    'nav.back': 'Back',
    'nav.continue': 'Continue',
    'sidebar.title': 'Why Book With Us?',
    'sidebar.certified': 'Certified Technicians',
    'sidebar.sameday': 'Same-day Service',
    'sidebar.rating': '4.9 Customer Rating',
    'sidebar.pricing': 'Transparent Pricing',
    'sidebar.coverage': 'Pan-India Coverage',
    'sidebar.support': '24/7 Support',
    'sidebar.selectedService': 'Selected Service',
    'sidebar.estimatedPrice': 'Estimated Price',
    'yes': 'Yes',
    'no': 'No',
    'lang.en': 'English',
    'lang.hi': 'हिन्दी',
    'razorpay.loading': 'Loading payment gateway...',
    'razorpay.success': 'Payment successful! Booking confirmed.',
    'razorpay.error': 'Payment failed or was cancelled. Please try again.',
  },
  hi: {
    'steps.service': 'सेवा',
    'steps.details': 'विवरण',
    'steps.schedule': 'शेड्यूल',
    'steps.review': 'समीक्षा',
    'service.title': 'सेवा चुनें',
    'service.subtitle': 'अपनी ज़रूरत की सेवा चुनें',
    'details.title': 'सेवा विवरण',
    'details.subtitle': 'हमें अपने AC के बारे में बताएं',
    'details.acType': 'AC का प्रकार',
    'details.brand': 'ब्रांड',
    'details.issue': 'समस्या',
    'details.notes': 'अतिरिक्त नोट्स (वैकल्पिक)',
    'details.notesPlaceholder': 'समस्या का विस्तार से वर्णन करें...',
    'schedule.title': 'सेवा शेड्यूल करें',
    'schedule.subtitle': 'तारीख, समय और स्थान चुनें',
    'schedule.emergency.title': 'आपातकालीन सेवा',
    'schedule.emergency.desc': '2 घंटे के भीतर प्राथमिकता सेवा',
    'schedule.emergency.enabled': 'सक्षम',
    'schedule.emergency.enable': 'सक्षम करें',
    'schedule.date': 'पसंदीदा तारीख',
    'schedule.time': 'पसंदीदा समय',
    'schedule.pincode': 'पिनकोड',
    'schedule.pincodePlaceholder': 'अपना पिनकोड दर्ज करें',
    'schedule.address': 'पूरा पता',
    'schedule.addressPlaceholder': 'मकान/फ्लैट नं., सड़क, लैंडमार्क, शहर...',
    'review.title': 'अपनी बुकिंग की समीक्षा करें',
    'review.subtitle': 'कृपया जमा करने से पहले सभी विवरण पुष्टि करें',
    'review.lblService': 'सेवा',
    'review.lblAcType': 'AC प्रकार',
    'review.lblBrand': 'ब्रांड',
    'review.lblIssue': 'समस्या',
    'review.lblDate': 'तारीख',
    'review.lblTime': 'समय',
    'review.lblPincode': 'पिनकोड',
    'review.lblEmergency': 'आपातकालीन',
    'review.lblPrice': 'कीमत',
    'review.contactTitle': 'आपकी संपर्क जानकारी',
    'review.namePlaceholder': 'आपका नाम',
    'review.phonePlaceholder': 'फोन नंबर',
    'review.submit': 'बुकिंग पुष्टि करें',
    'review.submitting': 'भुगतान प्रक्रिया जारी...',
    'nav.back': 'पीछे',
    'nav.continue': 'जारी रखें',
    'sidebar.title': 'हमसे क्यों बुक करें?',
    'sidebar.certified': 'प्रमाणित तकनीशियन',
    'sidebar.sameday': 'उसी दिन सेवा',
    'sidebar.rating': '4.9 ग्राहक रेटिंग',
    'sidebar.pricing': 'पारदर्शी मूल्य निर्धारण',
    'sidebar.coverage': 'पूरे भारत में कवरेज',
    'sidebar.support': '24/7 सहायता',
    'sidebar.selectedService': 'चयनित सेवा',
    'sidebar.estimatedPrice': 'अनुमानित मूल्य',
    'yes': 'हाँ',
    'no': 'नहीं',
    'lang.en': 'English',
    'lang.hi': 'हिन्दी',
    'razorpay.loading': 'भुगतान गेटवे लोड हो रहा है...',
    'razorpay.success': 'भुगतान सफल! बुकिंग पुष्टि हुई।',
    'razorpay.error': 'भुगतान विफल या रद्द कर दिया गया। कृपया पुनः प्रयास करें।',
  },
};

export default function BookingPageClient() {
  const [step, setStep] = useState<Step>('service');
  const [lang, setLang] = useState<Lang>('en');
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedACType, setSelectedACType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const t = useCallback((key: string) => translations[lang]?.[key] ?? translations.en[key] ?? key, [lang]);

  // Load Razorpay script
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => console.error('Failed to load Razorpay SDK');
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    } else if (typeof window !== 'undefined' && (window as any).Razorpay) {
      setRazorpayLoaded(true);
    }
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const canProceed = () => {
    if (step === 'service') return selectedService !== null;
    if (step === 'details') return selectedACType && selectedBrand && selectedIssue;
    if (step === 'schedule') return selectedDate && selectedTime && pincode.length === 6;
    return true;
  };

  const nextStep = () => {
    if (step === 'service') setStep('details');
    else if (step === 'details') setStep('schedule');
    else if (step === 'schedule') setStep('review');
  };

  const prevStep = () => {
    if (step === 'details') setStep('service');
    else if (step === 'schedule') setStep('details');
    else if (step === 'review') setStep('schedule');
  };

  const service = selectedService !== null ? services[selectedService] : null;

  const handleRazorpayPayment = () => {
    if (!razorpayLoaded) {
      alert(t('razorpay.loading'));
      return;
    }

    setIsSubmitting(true);

    // Use env variable or fallback placeholder key
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXXXX';

    const options = {
      key: razorpayKey,
      amount: service?.price ? parseInt(service.price.replace(/[^0-9]/g, '')) * 100 : 0,
      currency: 'INR',
      name: 'AC Repair Service',
      description: `${selectedACType} - ${selectedIssue}`,
      prefill: {
        name: name,
        contact: phone,
      },
      notes: {
        address: address,
        pincode: pincode,
        service: service?.title || '',
        acType: selectedACType,
        brand: selectedBrand,
        issue: selectedIssue,
        isEmergency: isEmergency ? '1' : '0',
      },
      handler: function (response: any) {
        setIsSubmitting(false);
        alert(`${t('razorpay.success')}\nPayment ID: ${response.razorpay_payment_id}`);
        // Reset form or redirect
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
          alert(t('razorpay.error'));
        },
      },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function () {
        setIsSubmitting(false);
        alert(t('razorpay.error'));
      });
      rzp.open();
    } catch (err) {
      setIsSubmitting(false);
      console.error('Razorpay error:', err);
      alert(t('razorpay.error'));
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const reviewItems = [
    { label: t('review.lblService'), value: service?.title },
    { label: t('review.lblAcType'), value: selectedACType },
    { label: t('review.lblBrand'), value: selectedBrand },
    { label: t('review.lblIssue'), value: selectedIssue },
    { label: t('review.lblDate'), value: selectedDate },
    { label: t('review.lblTime'), value: selectedTime },
    { label: t('review.lblPincode'), value: pincode },
    { label: t('review.lblEmergency'), value: isEmergency ? t('yes') : t('no') },
    { label: t('review.lblPrice'), value: service?.price },
  ];

  const sidebarItems = [
    { icon: Shield, text: t('sidebar.certified') },
    { icon: Clock, text: t('sidebar.sameday') },
    { icon: Star, text: t('sidebar.rating') },
    { icon: IndianRupee, text: t('sidebar.pricing') },
    { icon: MapPin, text: t('sidebar.coverage') },
    { icon: Phone, text: t('sidebar.support') },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-medium"
          title={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
        >
          <Languages className="w-4 h-4" />
          <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>
      </div>

      <div className="container-wide mx-auto px-4 sm:px-6">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center justify-between">
            {([
              { key: 'service', label: t('steps.service'), icon: Wrench },
              { key: 'details', label: t('steps.details'), icon: Star },
              { key: 'schedule', label: t('steps.schedule'), icon: CalendarDays },
              { key: 'review', label: t('steps.review'), icon: Check },
            ] as const).map((s, i) => {
              const isActive = step === s.key;
              const isCompleted = ['service', 'details', 'schedule', 'review'].indexOf(s.key) <
                ['service', 'details', 'schedule', 'review'].indexOf(step);

              return (
                <div key={s.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                      isActive && 'gradient-primary text-white shadow-lg shadow-primary/25',
                      isCompleted && 'bg-accent text-white',
                      !isActive && !isCompleted && 'bg-muted text-muted-foreground'
                    )}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                    </div>
                    <span className={cn(
                      'text-xs mt-1.5 font-medium',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}>
                      {s.label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div className={cn(
                      'h-0.5 w-12 sm:w-20 mx-2 transition-colors',
                      isCompleted ? 'bg-accent' : 'bg-muted'
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass rounded-3xl border p-6 md:p-8 shadow-xl"
              >
                {/* Step 1: Select Service */}
                {step === 'service' && (
                  <div>
                    <h2 className="text-2xl font-bold font-heading mb-2">{t('service.title')}</h2>
                    <p className="text-muted-foreground mb-6">{t('service.subtitle')}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedService(i)}
                          className={cn(
                            'flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200',
                            selectedService === i
                              ? 'border-primary bg-primary/5 ring-1 ring-primary'
                              : 'border-border hover:border-primary/50 hover:bg-muted/50'
                          )}
                        >
                          <div className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                            selectedService === i ? 'gradient-primary' : 'bg-muted'
                          )}>
                            <s.icon className={cn(
                              'w-5 h-5',
                              selectedService === i ? 'text-white' : 'text-primary'
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-sm">{s.title}</span>
                              <span className="text-sm font-bold text-accent">{s.price}</span>
                            </div>
                            <span className="text-xs text-muted-foreground line-clamp-1">{s.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Details */}
                {step === 'details' && (
                  <div>
                    <h2 className="text-2xl font-bold font-heading mb-2">{t('details.title')}</h2>
                    <p className="text-muted-foreground mb-6">{t('details.subtitle')}</p>

                    <div className="space-y-6">
                      {/* AC Type */}
                      <div>
                        <label className="block text-sm font-medium mb-3">{t('details.acType')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {acTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => setSelectedACType(type)}
                              className={cn(
                                'px-4 py-3 rounded-xl border text-sm transition-all',
                                selectedACType === type
                                  ? 'border-primary bg-primary/5 text-primary font-medium'
                                  : 'border-border hover:border-primary/50'
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Brand */}
                      <div>
                        <label className="block text-sm font-medium mb-3">{t('details.brand')}</label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {brands.map((b) => (
                            <button
                              key={b}
                              onClick={() => setSelectedBrand(b)}
                              className={cn(
                                'px-3 py-2.5 rounded-xl border text-xs transition-all',
                                selectedBrand === b
                                  ? 'border-primary bg-primary/5 text-primary font-medium'
                                  : 'border-border hover:border-primary/50'
                              )}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Issue */}
                      <div>
                        <label className="block text-sm font-medium mb-3">{t('details.issue')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {issues.map((issue) => (
                            <button
                              key={issue}
                              onClick={() => setSelectedIssue(issue)}
                              className={cn(
                                'px-4 py-3 rounded-xl border text-sm transition-all',
                                selectedIssue === issue
                                  ? 'border-primary bg-primary/5 text-primary font-medium'
                                  : 'border-border hover:border-primary/50'
                              )}
                            >
                              {issue}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-medium mb-3">{t('details.notes')}</label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={t('details.notesPlaceholder')}
                          className="w-full px-4 py-3 rounded-xl border bg-background text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {step === 'schedule' && (
                  <div>
                    <h2 className="text-2xl font-bold font-heading mb-2">{t('schedule.title')}</h2>
                    <p className="text-muted-foreground mb-6">{t('schedule.subtitle')}</p>

                    <div className="space-y-6">
                      {/* Emergency toggle */}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                          <div>
                            <p className="text-sm font-semibold text-red-700 dark:text-red-400">{t('schedule.emergency.title')}</p>
                            <p className="text-xs text-red-600/70 dark:text-red-500/70">{t('schedule.emergency.desc')}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsEmergency(!isEmergency)}
                          className={cn(
                            'px-6 py-2 rounded-xl text-sm font-semibold transition-all',
                            isEmergency
                              ? 'bg-red-500 text-white shadow-lg'
                              : 'bg-white dark:bg-red-950 text-red-600 border border-red-200 dark:border-red-800'
                          )}
                        >
                          {isEmergency ? t('schedule.emergency.enabled') : t('schedule.emergency.enable')}
                        </button>
                      </div>

                      {/* Date */}
                      <div>
                        <label className="block text-sm font-medium mb-3">{t('schedule.date')}</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={today}
                          className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>

                      {/* Time */}
                      <div>
                        <label className="block text-sm font-medium mb-3">{t('schedule.time')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={cn(
                                'px-4 py-3 rounded-xl border text-sm transition-all',
                                selectedTime === time
                                  ? 'border-primary bg-primary/5 text-primary font-medium'
                                  : 'border-border hover:border-primary/50'
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Pincode */}
                      <div>
                        <label className="block text-sm font-medium mb-3">{t('schedule.pincode')}</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder={t('schedule.pincodePlaceholder')}
                            maxLength={6}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium mb-3">{t('schedule.address')}</label>
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder={t('schedule.addressPlaceholder')}
                          className="w-full px-4 py-3 rounded-xl border bg-background text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Confirm */}
                {step === 'review' && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold font-heading mb-2">{t('review.title')}</h2>
                      <p className="text-muted-foreground">{t('review.subtitle')}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {reviewItems.map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">{t('review.contactTitle')}</h3>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('review.namePlaceholder')}
                        className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder={t('review.phonePlaceholder')}
                        className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* Submit with Razorpay */}
                    <button
                      disabled={isSubmitting || !name || !phone || phone.length !== 10}
                      className={cn(
                        'w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2',
                        isSubmitting || !name || !phone || phone.length !== 10
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : 'gradient-primary text-white hover:shadow-xl hover:scale-[1.02]'
                      )}
                      onClick={handleRazorpayPayment}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t('review.submitting')}
                        </>
                      ) : (
                        <>
                          {t('review.submit')}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Navigation */}
                {step !== 'review' && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t">
                    <button
                      onClick={prevStep}
                      className={cn(
                        'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all',
                        step === 'service'
                          ? 'text-muted-foreground cursor-not-allowed'
                          : 'border hover:bg-muted'
                      )}
                      disabled={step === 'service'}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t('nav.back')}
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className={cn(
                        'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all',
                        canProceed()
                          ? 'gradient-primary text-white hover:shadow-lg'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      )}
                    >
                      {t('nav.continue')}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="glass rounded-3xl border p-6 shadow-xl sticky top-28">
              <h3 className="font-semibold font-heading mb-4">{t('sidebar.title')}</h3>
              <div className="space-y-4">
                {sidebarItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              {service && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{t('sidebar.selectedService')}</span>
                    <span className="text-sm font-semibold">{service.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('sidebar.estimatedPrice')}</span>
                    <span className="text-lg font-bold gradient-text">{service.price}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}