import {
  Wrench, Wind, Fan, Zap, Droplets, Thermometer,
  CircuitBoard, Cpu, CalendarCheck, Building2,
  Snowflake,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  duration: string;
  popular?: boolean;
  emergency?: boolean;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  comment: string;
  service: string;
  avatar?: string;
}

export const services: Service[] = [
  {
    icon: Wind,
    title: 'Split AC Repair',
    description: 'Expert repair for all split AC brands. Quick diagnosis and same-day service.',
    price: '₹299',
    duration: '30-60 min',
    popular: true,
  },
  {
    icon: Fan,
    title: 'Window AC Repair',
    description: 'Complete window AC repair including compressor, motor, and PCB issues.',
    price: '₹349',
    duration: '45-90 min',
  },
  {
    icon: Wrench,
    title: 'AC Installation',
    description: 'Professional split and window AC installation with safety standards.',
    price: '₹999',
    duration: '2-3 hours',
  },
  {
    icon: Wrench,
    title: 'AC Uninstallation',
    description: 'Safe AC removal with gas recovery and wall patching service.',
    price: '₹499',
    duration: '1-2 hours',
  },
  {
    icon: Droplets,
    title: 'Gas Filling',
    description: 'Refrigerant gas refill for R32, R410A, R22 with leak check.',
    price: '₹1,999',
    duration: '1-2 hours',
    emergency: true,
  },
  {
    icon: Droplets,
    title: 'AC Jet Wash',
    description: 'Deep jet wash cleaning for indoor and outdoor units.',
    price: '₹599',
    duration: '45-60 min',
  },
  {
    icon: Thermometer,
    title: 'Deep Cleaning',
    description: 'Complete 5-step AC deep cleaning with anti-bacterial treatment.',
    price: '₹799',
    duration: '1-2 hours',
  },
  {
    icon: Droplets,
    title: 'Water Leakage Repair',
    description: 'Fix water leakage from AC drain pipe, installation issues.',
    price: '₹399',
    duration: '30-45 min',
  },
  {
    icon: CircuitBoard,
    title: 'PCB Repair',
    description: 'AC PCB board repair and replacement for all brands.',
    price: '₹999',
    duration: '2-4 hours',
  },
  {
    icon: Cpu,
    title: 'Compressor Repair',
    description: 'AC compressor repair and replacement service.',
    price: '₹2,999',
    duration: '3-6 hours',
    emergency: true,
  },
  {
    icon: CalendarCheck,
    title: 'Annual Maintenance',
    description: 'Yearly AMC contract with 2 visits, priority support, and 10% discount.',
    price: '₹1,999/yr',
    duration: 'Annual',
  },
  {
    icon: Building2,
    title: 'Commercial AC Repair',
    description: 'Cassette, tower, duct, and VRV/VRF system repair and maintenance.',
    price: '₹999+',
    duration: 'Varies',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    comment: 'Excellent service! My split AC was not cooling at all. Technician came within 2 hours, diagnosed the issue immediately, and fixed the gas leak. Working perfectly now.',
    service: 'Split AC Repair',
  },
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Very professional team. I booked AC installation online and they came exactly on time. Installation was clean and tidy. Highly recommended!',
    service: 'AC Installation',
  },
  {
    name: 'Amit Patel',
    location: 'Bangalore',
    rating: 5,
    comment: 'Been using their AMC service for a year now. Regular maintenance visits, priority service, and great discounts. Best decision for our office ACs.',
    service: 'AMC Service',
  },
  {
    name: 'Neha Gupta',
    location: 'Pune',
    rating: 5,
    comment: 'My AC was making strange noises. The technician diagnosed a compressor issue and fixed it at a very reasonable price. Transparent pricing as promised.',
    service: 'Compressor Repair',
  },
  {
    name: 'Suresh Reddy',
    location: 'Hyderabad',
    rating: 5,
    comment: 'Fast response for emergency service. AC stopped working at night, called them and they arranged a technician first thing in the morning. Great support!',
    service: 'Emergency Service',
  },
  {
    name: 'Anjali Desai',
    location: 'Ahmedabad',
    rating: 5,
    comment: 'Deep cleaning service was thorough. They used anti-bacterial spray and the AC feels like new. Indoor unit looks spotless. Worth every rupee!',
    service: 'Deep Cleaning',
  },
];

export const brands = [
  'LG', 'Samsung', 'Voltas', 'Daikin', 'Blue Star', 'Hitachi',
  'Panasonic', 'Carrier', 'Godrej', 'Whirlpool', 'Lloyd', 'Haier',
  'IFB', 'Mitsubishi', 'O General', 'Electrolux',
];

export const faqs = [
  {
    question: 'How quickly can you send a technician?',
    answer: 'We offer same-day service! If you book before 2 PM, our technician will arrive within 2-4 hours. For emergency bookings, we prioritize same-day arrival. Our average response time is under 2 hours in most service areas.',
  },
  {
    question: 'Are your technicians certified?',
    answer: 'Yes, every technician on our platform is background-verified, certified, and has minimum 2 years of experience. They undergo regular training on the latest AC technologies and safety protocols.',
  },
  {
    question: 'What brands of AC do you repair?',
    answer: 'We repair all major AC brands including LG, Samsung, Voltas, Daikin, Blue Star, Hitachi, Panasonic, Carrier, Godrej, Whirlpool, Lloyd, Haier, IFB, Mitsubishi, O General, and many more.',
  },
  {
    question: 'Do you provide warranty on repairs?',
    answer: 'Absolutely! All our services come with a 30-day warranty. If the same issue reoccurs within 30 days, we will fix it free of charge. Installation services come with a 90-day warranty.',
  },
  {
    question: 'What is the pricing structure?',
    answer: 'We believe in transparent pricing. You can see the exact price before booking. There are no hidden charges - what you see is what you pay. Prices include the service fee and basic diagnosis.',
  },
  {
    question: 'Do you service commercial AC systems?',
    answer: 'Yes, we service all types of commercial AC systems including cassette AC, tower AC, duct AC, VRV, and VRF systems. Our technicians are specially trained for commercial installations and repairs.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods: cash, credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and digital wallets. You can pay online or after service completion.',
  },
  {
    question: 'Can I reschedule or cancel a booking?',
    answer: 'Yes, you can reschedule or cancel a booking free of charge up to 2 hours before the scheduled time. Late cancellations may incur a small fee. You can manage bookings from your dashboard.',
  },
];