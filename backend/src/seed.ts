import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { phone: '9999999999' },
    update: {},
    create: {
      name: 'Admin',
      phone: '9999999999',
      email: 'admin@coolfixpro.com',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      isVerified: true,
    },
  });
  console.log('Admin created:', admin.phone);

  // Create service categories
  const categories = [
    { name: 'AC Repair', slug: 'ac-repair', description: 'Professional AC repair services', sortOrder: 1 },
    { name: 'AC Installation', slug: 'ac-installation', description: 'Expert AC installation', sortOrder: 2 },
    { name: 'AC Maintenance', slug: 'ac-maintenance', description: 'Regular maintenance and AMC', sortOrder: 3 },
    { name: 'Commercial AC', slug: 'commercial-ac', description: 'Commercial AC services', sortOrder: 4 },
  ];

  for (const cat of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Categories created');

  const repairCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'ac-repair' } });
  const installCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'ac-installation' } });
  const maintenanceCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'ac-maintenance' } });
  const commercialCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'commercial-ac' } });

  // Create services
  const services = [
    { categoryId: repairCategory!.id, name: 'Split AC Repair', slug: 'split-ac-repair', price: 299, duration: 45, isPopular: true, sortOrder: 1 },
    { categoryId: repairCategory!.id, name: 'Window AC Repair', slug: 'window-ac-repair', price: 349, duration: 60, sortOrder: 2 },
    { categoryId: repairCategory!.id, name: 'Gas Filling', slug: 'gas-filling', price: 1999, duration: 90, isEmergency: true, sortOrder: 3 },
    { categoryId: repairCategory!.id, name: 'PCB Repair', slug: 'pcb-repair', price: 999, duration: 180, sortOrder: 4 },
    { categoryId: repairCategory!.id, name: 'Compressor Repair', slug: 'compressor-repair', price: 2999, duration: 240, isEmergency: true, sortOrder: 5 },
    { categoryId: repairCategory!.id, name: 'Water Leakage Repair', slug: 'water-leakage-repair', price: 399, duration: 30, sortOrder: 6 },
    { categoryId: installCategory!.id, name: 'AC Installation', slug: 'ac-installation', price: 999, duration: 180, sortOrder: 7 },
    { categoryId: installCategory!.id, name: 'AC Uninstallation', slug: 'ac-uninstallation', price: 499, duration: 90, sortOrder: 8 },
    { categoryId: maintenanceCategory!.id, name: 'AC Deep Cleaning', slug: 'ac-deep-cleaning', price: 799, duration: 90, sortOrder: 9 },
    { categoryId: maintenanceCategory!.id, name: 'AC Jet Wash', slug: 'ac-jet-wash', price: 599, duration: 60, sortOrder: 10 },
    { categoryId: maintenanceCategory!.id, name: 'Annual Maintenance Contract', slug: 'amc', price: 1999, duration: 365, sortOrder: 11 },
    { categoryId: commercialCategory!.id, name: 'Commercial AC Repair', slug: 'commercial-ac-repair', price: 999, duration: 120, sortOrder: 12 },
  ];

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: svc,
    });
  }
  console.log('Services created');

  // Create cities
  const cities = [
    { name: 'Delhi', state: 'Delhi' },
    { name: 'Mumbai', state: 'Maharashtra' },
    { name: 'Bangalore', state: 'Karnataka' },
    { name: 'Hyderabad', state: 'Telangana' },
    { name: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Kolkata', state: 'West Bengal' },
    { name: 'Pune', state: 'Maharashtra' },
    { name: 'Ahmedabad', state: 'Gujarat' },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { name_state: { name: city.name, state: city.state } },
      update: {},
      create: city,
    });
  }
  console.log('Cities created');

  // Create FAQs
  const faqs = [
    { question: 'How quickly can you send a technician?', answer: 'We offer same-day service! If you book before 2 PM, our technician will arrive within 2-4 hours.', category: 'Booking', sortOrder: 1 },
    { question: 'Are your technicians certified?', answer: 'Yes, every technician is background-verified, certified, and has minimum 2 years of experience.', category: 'Service', sortOrder: 2 },
    { question: 'What brands of AC do you repair?', answer: 'We repair all major AC brands including LG, Samsung, Voltas, Daikin, Blue Star, Hitachi, and more.', category: 'Service', sortOrder: 3 },
    { question: 'Do you provide warranty on repairs?', answer: 'All services come with a 30-day warranty. Installation services come with a 90-day warranty.', category: 'Warranty', sortOrder: 4 },
    { question: 'What is the pricing structure?', answer: 'We believe in transparent pricing. You can see the exact price before booking. No hidden charges.', category: 'Pricing', sortOrder: 5 },
    { question: 'What payment methods do you accept?', answer: 'We accept cash, credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and digital wallets.', category: 'Payment', sortOrder: 6 },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log('FAQs created');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });